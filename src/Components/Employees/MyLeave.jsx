import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Calendar,
  FileText,
  Check,
} from "lucide-react";

const typeColors = {
  sick: {
    pill: "bg-red-500/10 text-red-400 border-red-500/20",
    dot: "bg-red-400",
    card: "bg-red-500/5 border-red-500/15",
    active: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  casual: {
    pill: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    dot: "bg-sky-400",
    card: "bg-sky-500/5 border-sky-500/15",
    active: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  },
  vacation: {
    pill: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    dot: "bg-violet-400",
    card: "bg-violet-500/5 border-violet-500/15",
    active: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
};

const statusConfig = {
  pending: "bg-sky-500/10 text-sky-400",
  approved: "bg-emerald-500/10 text-emerald-400",
  rejected: "bg-red-500/10 text-red-400",
  cancelled: "bg-slate-700/50 text-slate-500",
};

const MyLeave = ({ employeeData, applyLeave, cancelLeave }) => {
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

<<<<<<< HEAD
  const leaveRequests = employeeData?.leaveRequests || [];
=======
  const leaveRequests = employeeData.leaveRequests || [];
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Today at midnight for accurate comparison
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);
  const todayStr = todayMidnight.toISOString().split("T")[0];

  // Check if a day number in the current viewed month is in the past
  const isPastDay = (day) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d < todayMidnight;
  };

  // Check if a day number is today
  const isTodayDay = (day) => {
    return (
      todayMidnight.getDate() === day &&
      todayMidnight.getMonth() === month &&
      todayMidnight.getFullYear() === year
    );
  };

  // Build a map of day -> leave request
  // Only show leave on today or future dates
  const getLeaveDates = () => {
    const dates = {};
    leaveRequests
      .filter((r) => r.status !== "cancelled" && r.status !== "rejected")
      .forEach((req) => {
        const start = new Date(req.startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(req.endDate);
        end.setHours(0, 0, 0, 0);

        for (
          let d = new Date(start);
          d <= end;
          d.setDate(d.getDate() + 1)
        ) {
          const dayMidnight = new Date(d);
          dayMidnight.setHours(0, 0, 0, 0);

          // Only mark dates that are today or future AND in the current viewed month/year
          if (
            dayMidnight >= todayMidnight &&
            d.getFullYear() === year &&
            d.getMonth() === month
          ) {
            dates[d.getDate()] = req;
          }
        }
      });
    return dates;
  };

  const leaveDates = getLeaveDates();

  const totalDays = (s, e) =>
    Math.ceil((new Date(e) - new Date(s)) / 86400000) + 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate || !form.leaveType || !form.reason)
      return setError("Please fill in all fields.");

    const startD = new Date(form.startDate);
    startD.setHours(0, 0, 0, 0);
    const endD = new Date(form.endDate);
    endD.setHours(0, 0, 0, 0);

    if (startD < todayMidnight)
      return setError("Start date cannot be in the past.");
    if (endD < startD)
      return setError("End date cannot be before start date.");

    setError("");
    setSubmitted(true);
    applyLeave(form);
    setTimeout(() => {
      setForm({ startDate: "", endDate: "", leaveType: "", reason: "" });
      setSubmitted(false);
      setShowForm(false);
    }, 1200);
  };

  const handleCancelLeave = (req) => {
    cancelLeave(req.id, req.leaveType);
  };

  const stats = [
    {
      label: "Applied",
      value: leaveRequests.length,
      color: "text-slate-300",
    },
    {
      label: "Pending",
      value: leaveRequests.filter((r) => r.status === "pending").length,
      color: "text-sky-400",
    },
    {
      label: "Approved",
      value: leaveRequests.filter((r) => r.status === "approved").length,
      color: "text-emerald-400",
    },
    {
      label: "Rejected",
      value: leaveRequests.filter((r) => r.status === "rejected").length,
      color: "text-red-400",
    },
  ];

  return (
<<<<<<< HEAD
    <div className="p-1">
=======
    <div className="p-5">
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">My Leave</h1>
          <p className="text-slate-500 text-sm mt-1">
            Track and manage your leave requests
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={15} /> Apply Leave
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
<<<<<<< HEAD
            className="bg-[#10111C] border border-[#1E2235] rounded-md p-4"
=======
            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
          >
            <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className=" grid grid-cols-2 gap-4">
      
<<<<<<< HEAD
        <div className=" h-85 bg-[#10111C] border border-[#1E2235] rounded-md p-5">
=======
        <div className=" h-85 bg-slate-900 border border-slate-800 rounded-xl p-5">
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200">{monthName}</h2>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-all"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-all"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div
                key={d}
                className="text-center text-[10px] text-slate-600 font-medium py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const req = leaveDates[day];
              const past = isPastDay(day);
              const todayMark = isTodayDay(day);
              const tc = req ? typeColors[req.leaveType] : null;

              let cellClass =
                "relative text-center text-xs py-1.5 rounded-lg mx-0.5 font-medium transition-all select-none ";

              if (todayMark) {
                cellClass += "bg-violet-600 text-white";
              } else if (past) {
                // Past dates: muted, no hover, no leave highlight
                cellClass += "text-slate-700 cursor-default";
              } else if (req) {
                // Future leave date
                cellClass += `${tc.active} border cursor-default`;
              } else {
                // Normal future date
                cellClass += "text-slate-400 hover:bg-slate-800 cursor-default";
              }

              return (
                <div key={day} className={cellClass}>
                  {day}
                  {/* Dot indicator only on future leave dates */}
                  {req && !todayMark && !past && (
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full ${tc.dot}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              <span className="text-[10px] text-slate-500">Today</span>
            </div>
            {Object.entries(typeColors).map(([type, c]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                <span className="text-[10px] text-slate-500 capitalize">
                  {type}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-700" />
              <span className="text-[10px] text-slate-500">Past</span>
            </div>
          </div>
        </div>

        {/* ── History ── */}
<<<<<<< HEAD
        <div className="bg-[#10111C] border border-[#1E2235] rounded-md p-5">
=======
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
          <h2 className="text-sm font-semibold text-slate-200 mb-4">History</h2>

          {leaveRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <Calendar size={28} className="text-slate-700 mb-3" />
              <p className="text-sm text-slate-500">No leave requests yet</p>
              <p className="text-xs text-slate-700 mt-1">
                Apply for leave to see history here
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 overflow-y-auto max-h-72 pr-1">
              {[...leaveRequests].reverse().map((req) => {
                const tc = typeColors[req.leaveType] || typeColors.casual;
                return (
                  <div
                    key={req.id}
                    className={`p-3 rounded-xl border ${tc.card}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-medium capitalize px-2 py-0.5 rounded-full border ${tc.pill}`}
                      >
                        {req.leaveType}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${statusConfig[req.status]}`}
                        >
                          {req.status}
                        </span>
                        {req.status === "pending" && (
                          <button
                            onClick={() => handleCancelLeave(req)}
                            className="text-slate-600 hover:text-red-400 transition-all"
                            title="Cancel this leave request"
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">
                      {new Date(req.startDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                      {" → "}
                      {new Date(req.endDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      <span className="text-slate-600 ml-1.5">
                        ({totalDays(req.startDate, req.endDate)}d)
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-600 truncate">
                      {req.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Apply Leave Modal ── */}
      {showForm && (
<<<<<<< HEAD
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 backdrop-blur-0">
          <div className="w-[460px] bg-[#10111C] border border-[#1E2235] rounded-2xl px-8 py-7 relative shadow-2xl">
=======
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[460px] bg-slate-900 border border-slate-700 rounded-2xl px-8 py-7 relative shadow-2xl">
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
            <button
              onClick={() => {
                setShowForm(false);
                setError("");
                setForm({ startDate: "", endDate: "", leaveType: "", reason: "" });
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 transition-all"
            >
              <X size={18} />
            </button>

            {/* Brand */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-xs text-white">
                W
              </div>
              <span className="text-slate-200 text-sm font-semibold">
                Work<span className="text-violet-400">Zen</span>
              </span>
            </div>

            <h2 className="text-lg font-semibold text-slate-100 mb-1">
              Apply for{" "}
              <span className="text-violet-400 font-normal italic">leave</span>
            </h2>
            <p className="text-[11px] text-slate-500 mb-5">
              Fill in the details for your leave request.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Leave Type Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10.5px] font-medium tracking-widest uppercase text-slate-500">
                  Leave Type
                </label>
                <div className="flex gap-2">
                  {["sick", "casual", "vacation"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setForm({ ...form, leaveType: type })}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium border capitalize transition-all
                        ${
                          form.leaveType === type
                            ? `${typeColors[type].pill}`
                            : "bg-slate-800/50 text-slate-500 border-slate-700 hover:border-slate-600 hover:text-slate-400"
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Pickers */}
              <div className="grid grid-cols-2 gap-3">
                {["startDate", "endDate"].map((field) => (
                  <div key={field} className="flex flex-col gap-1.5">
                    <label className="text-[10.5px] font-medium tracking-widest uppercase text-slate-500">
                      {field === "startDate" ? "Start Date" : "End Date"}
                    </label>
                    <div className="relative">
                      <Calendar
                        size={13}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      />
                      <input
                        type="date"
                        min={todayStr}
                        value={form[field]}
                        onChange={(e) => {
                          setForm({ ...form, [field]: e.target.value });
                          setError("");
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-9 pr-3 text-sm text-slate-200 outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Reason */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10.5px] font-medium tracking-widest uppercase text-slate-500">
                  Reason
                </label>
                <div className="relative">
                  <FileText
                    size={13}
                    className="absolute left-3.5 top-3 text-slate-600 pointer-events-none"
                  />
                  <textarea
                    rows={3}
                    placeholder="Describe your reason..."
                    value={form.reason}
                    onChange={(e) => {
                      setForm({ ...form, reason: e.target.value });
                      setError("");
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-violet-500 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitted}
                className={`w-full py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all
                  ${submitted ? "bg-emerald-600 opacity-80" : "bg-violet-600 hover:bg-violet-500"}`}
              >
                {submitted ? (
                  <>
                    <Check size={15} /> Submitted!
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLeave;