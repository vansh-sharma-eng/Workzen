import { useState, useEffect } from "react";

const AttendanceStatus = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [workingHours, setWorkingHours] = useState("00:00:00");
  const [status, setStatus] = useState("Working");

  useEffect(() => {
    let interval;

    if (isPunchedIn && punchInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now - punchInTime;

        const hrs = String(
          Math.floor(diff / (1000 * 60 * 60))
        ).padStart(2, "0");

        const mins = String(
          Math.floor((diff / (1000 * 60)) % 60)
        ).padStart(2, "0");

        const secs = String(
          Math.floor((diff / 1000) % 60)
        ).padStart(2, "0");

        setWorkingHours(`${hrs}:${mins}:${secs}`);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPunchedIn, punchInTime]);

  const handlePunchIn = () => {
    const now = new Date();

    setPunchInTime(now);
    setIsPunchedIn(true);
    setStatus("Working");
  };

  const handlePunchOut = () => {
    setIsPunchedIn(false);
    setPunchInTime(null);
    setWorkingHours("00:00:00");
    setStatus("Offline");
  };

  const formatTime = (date) => {
    if (!date) return "--:--:--";

    return date.toLocaleTimeString("en-US", {
      hour12: true,
    });
  };

  return (
    <div className=" bg-[#10111C] border border-[#1E2235] rounded-md p-8">
      <h2 className="text-xl font-semibold mb-8">
        Today's Status
      </h2>

      {!isPunchedIn ? (
        <div className="h-[150px] flex items-center justify-center">
          <button
            onClick={handlePunchIn}
            className="w-[200px] h-10 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-semibold transition"
          >
            Punch In
          </button>
        </div>
      ) : (
        <>
          <div className="bg-[#131827] rounded-md py-3 px-8 flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-md">
                Punched in at
              </p>

              <h2 className="text-md font-bold mt-2">
                {formatTime(punchInTime)}
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
          </div>

          <div className="flex  gap-6 ml-30 mt-4">
            <button
              onClick={() => setStatus("Working")}
              className={`h-10 w-40 rounded-md text-md font-semibold transition ${
                status === "Working"
                  ? "bg-indigo-600"
                  : "bg-[#131827] border border-slate-700"
              }`}
            >
              Working
            </button>

            <button
              onClick={() => setStatus("In Meeting")}
              className={`h-10 w-40 rounded-md text-md font-semibold transition ${
                status === "In Meeting"
                  ? "bg-indigo-600"
                  : "bg-[#131827] border border-slate-700"
              }`}
            >
              In Meeting
            </button>

            <button
              onClick={() => setStatus("On Break")}
              className={`h-10 w-40 rounded-md text-md font-semibold transition ${
                status === "On Break"
                  ? "bg-indigo-600"
                  : "bg-[#131827] border border-slate-700"
              }`}
            >
              On Break
            </button>

            <button
              onClick={() => setStatus("WFH")}
              className={`h-10 w-40 rounded-md text-mdfont-semibold transition ${
                status === "WFH"
                  ? "bg-indigo-600"
                  : "bg-[#131827] border border-slate-700"
              }`}
            >
              WFH
            </button>
          </div>

          <button
            onClick={handlePunchOut}
            className="w-1/4 ml-[35%] mt-6 h-10 rounded-md bg-red-900 hover:bg-red-800 text-white text-md font-semibold transition"
          >
            Punch Out
          </button>
        </>
      )}
    </div>
  );
};

export default AttendanceStatus;