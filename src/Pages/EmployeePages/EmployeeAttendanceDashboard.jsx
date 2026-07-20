import { useCallback, useEffect, useState } from "react";
import { Home, X } from "lucide-react";
import AttendanceStats from "../../Components/Employee/Employee/AttendanceStatus";
import AttendanceStatus from "../../Components/Employee/Employee/AttendanceStats";
import AttendanceCalendar from "../../Components/Employee/Employee/AttendanceCalendar";
import attendanceApi from "../../api/attendanceApi";
import wfhApi from "../../api/wfhApi";
import settingsApi from "../../api/settingsApi";

const todayIso = () => new Date().toISOString().slice(0, 10);

const WFH_STATUS_STYLE = {
  PENDING: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  APPROVED: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  REJECTED: "text-red-400 bg-red-500/10 border-red-500/30",
};

const RequestWfhModal = ({ open, onClose, onSubmit }) => {
  const [date, setDate] = useState(todayIso());
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      setError("Please pick a date.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({ date, reason: reason.trim() });
      setReason("");
      onClose();
    } catch (err) {
      setError(err.message || "Couldn't submit your WFH request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-[#10111C] border border-[#1E2235] rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center border-b border-[#1E2235] px-6 py-5">
          <h2 className="text-lg font-bold text-white">Request Work From Home</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Date</label>
            <input
              type="date"
              value={date}
              min={todayIso()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#1b1d24] border border-[#272727] rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-2">Reason (optional)</label>
            <textarea
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Let your manager know why…"
              className="w-full resize-none bg-[#1b1d24] border border-[#272727] rounded-xl px-4 py-2.5 text-white outline-none focus:border-indigo-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#272727] text-gray-300 hover:border-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EmployeeAttendanceDashboard = ({ data }) => {
  const [records, setRecords] = useState([]);
  const [wfhRequests, setWfhRequests] = useState([]);
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWfhModal, setShowWfhModal] = useState(false);

  const load = useCallback(async () => {
    if (!data?.id) return;
    setLoading(true);
    setError(null);
    try {
      const [attendanceRes, wfhRes, officesRes] = await Promise.all([
        attendanceApi.getForEmployee(data.id),
        wfhApi.getForEmployee(data.id),
        settingsApi.getOfficeLocations(),
      ]);
      setRecords(attendanceRes || []);
      setWfhRequests(wfhRes || []);
      setOffices(officesRes || []);
    } catch (err) {
      setError(err.message || "Failed to load attendance.");
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load();
  }, [load]);

  const present = records.filter((r) => r.status === "PRESENT" || r.status === "WFH").length;
  const absent = records.filter((r) => r.status === "ABSENT" || r.status === "ON_LEAVE").length;
  const late = records.filter((r) => r.status === "LATE").length;
  const marked = records.length;
  const percent = marked ? Math.round(((present + late) / marked) * 100) : 0;

  const todayRecord = records.find((r) => r.date === todayIso());
  const wfhApprovedToday = wfhRequests.some((w) => w.date === todayIso() && w.status === "APPROVED");

  const handlePunchIn = async (punchData) => {
    await attendanceApi.punchIn(punchData || undefined);
    await load();
  };

  const handlePunchOut = async () => {
    await attendanceApi.punchOut();
    await load();
  };

  const handleRequestWfh = async ({ date, reason }) => {
    await wfhApi.apply(data.id, { date, reason });
    await load();
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-md p-3">
          {error} — showing what's available.
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setShowWfhModal(true)}
          className="flex items-center gap-2 bg-[#10111C] border border-[#1E2235] hover:border-indigo-500 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
        >
          <Home size={15} /> Request WFH
        </button>
      </div>

      <AttendanceStats
        stats={{ present, absent, late, percent }}
        loading={loading}
      />

      <AttendanceStatus
        todayRecord={todayRecord}
        wfhApprovedToday={wfhApprovedToday}
        offices={offices}
        onPunchIn={handlePunchIn}
        onPunchOut={handlePunchOut}
      />

      {wfhRequests.length > 0 && (
        <div className="bg-[#10111C] border border-[#1E2235] rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4">My WFH Requests</h2>
          <div className="space-y-2">
            {wfhRequests
              .slice()
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((w) => (
                <div
                  key={w.id}
                  className="flex items-center justify-between bg-[#131827] rounded-md px-4 py-3"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{w.date}</p>
                    {w.reason && <p className="text-slate-500 text-xs mt-0.5">{w.reason}</p>}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${WFH_STATUS_STYLE[w.status]}`}>
                    {w.status}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <AttendanceCalendar records={records} />

      <RequestWfhModal
        open={showWfhModal}
        onClose={() => setShowWfhModal(false)}
        onSubmit={handleRequestWfh}
      />
    </div>
  );
};

export default EmployeeAttendanceDashboard;
