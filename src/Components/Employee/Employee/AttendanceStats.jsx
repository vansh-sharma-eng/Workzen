import { useEffect, useState } from "react";
import { MapPin, Home, AlertCircle } from "lucide-react";

const STATUS_LABEL = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
  WFH: "Work From Home",
  ON_LEAVE: "On Leave",
};

/** Wraps the browser Geolocation API in a promise with a friendly timeout/error. */
const getBrowserLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Your browser doesn't support location access."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          reject(new Error("Location access was denied. Enable it in your browser to punch in from the office."));
        } else {
          reject(new Error("Couldn't get your location. Please try again."));
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });

const AttendanceStatus = ({ todayRecord, wfhApprovedToday, offices = [], onPunchIn, onPunchOut }) => {
  const [now, setNow] = useState(new Date());
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [officeId, setOfficeId] = useState("");

  // Falls back to the first office until the user explicitly picks one — avoids syncing state
  // from the `offices` prop (which arrives async) via an effect.
  const effectiveOfficeId = officeId || (offices[0] ? String(offices[0].id) : "");

  const punchedIn = !!todayRecord?.checkIn;
  const punchedOut = !!todayRecord?.checkOut;

  useEffect(() => {
    if (!punchedIn || punchedOut) return undefined;
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, [punchedIn, punchedOut]);

  const workingHours = (() => {
    if (!punchedIn || !todayRecord?.checkIn) return "00:00:00";
    const [h, m, s] = todayRecord.checkIn.split(":").map(Number);
    const checkInDate = new Date(now);
    checkInDate.setHours(h, m, s || 0, 0);
    const diff = Math.max(0, now - checkInDate);
    const hrs = String(Math.floor(diff / 3_600_000)).padStart(2, "0");
    const mins = String(Math.floor((diff / 60_000) % 60)).padStart(2, "0");
    const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  })();

  const handlePunchIn = async () => {
    setError("");
    setWorking(true);
    try {
      if (wfhApprovedToday) {
        await onPunchIn(null);
      } else {
        if (!effectiveOfficeId) {
          setError("Select which office you're at before punching in.");
          setWorking(false);
          return;
        }
        const coords = await getBrowserLocation();
        await onPunchIn({ ...coords, officeLocationId: Number(effectiveOfficeId) });
      }
    } catch (err) {
      setError(err.message || "Couldn't punch in.");
    } finally {
      setWorking(false);
    }
  };

  const handlePunchOut = async () => {
    setError("");
    setWorking(true);
    try {
      await onPunchOut();
    } catch (err) {
      setError(err.message || "Couldn't punch out.");
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className=" bg-[#10111C] border border-[#1E2235] rounded-md p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">
          Today's Status
        </h2>

        {wfhApprovedToday && !punchedIn && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full">
            <Home size={12} /> WFH approved for today
          </span>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-md p-3 mb-5">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {punchedOut ? (
        <div className="bg-[#131827] rounded-md py-5 px-8 flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-md">
              {STATUS_LABEL[todayRecord.status] || todayRecord.status}
            </p>
            <h2 className="text-lg font-bold mt-2">
              Day complete
            </h2>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-md">Check In / Out</p>
            <h2 className="text-lg font-bold mt-2">
              {todayRecord.checkIn || "--:--"} — {todayRecord.checkOut || "--:--"}
            </h2>
          </div>
        </div>
      ) : !punchedIn ? (
        <div className="py-6 flex flex-col items-center justify-center gap-3">
          {!wfhApprovedToday && offices.length > 0 && (
            <div className="w-full max-w-xs mb-1">
              <label className="text-slate-500 text-xs block mb-1.5 text-center">
                Which office are you at?
              </label>
              <select
                value={effectiveOfficeId}
                onChange={(e) => setOfficeId(e.target.value)}
                className="w-full bg-[#1b1d24] border border-[#272727] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              >
                {offices.map((o) => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handlePunchIn}
            disabled={working}
            className="w-[200px] h-10 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-semibold transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {!wfhApprovedToday && <MapPin size={16} />}
            {working ? "Checking…" : "Punch In"}
          </button>
          <p className="text-slate-500 text-xs text-center max-w-xs">
            {wfhApprovedToday
              ? "You're approved to work from home today — punch in from anywhere."
              : "You'll need to be at the selected office and allow location access to punch in."}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-[#131827] rounded-md py-3 px-8 flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-md">
                Punched in at
              </p>

              <h2 className="text-md font-bold mt-2">
                {todayRecord.checkIn}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-slate-400 text-md">
                Working hours
              </p>

              <h2 className="text-md font-bold mt-2">
                {workingHours}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-slate-400 text-md">
                Status
              </p>

              <h2 className="text-md font-bold mt-2">
                {STATUS_LABEL[todayRecord.status] || todayRecord.status}
                {todayRecord.officeLocationName ? ` · ${todayRecord.officeLocationName}` : ""}
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <button
              onClick={handlePunchOut}
              disabled={working}
              className="w-1/4 h-10 rounded-md bg-red-900 hover:bg-red-800 text-white text-md font-semibold transition disabled:opacity-60"
            >
              {working ? "…" : "Punch Out"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceStatus;
