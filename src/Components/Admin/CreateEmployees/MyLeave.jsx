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
    pill: "bg-red-500/10 text-red-400 border border-red-500/20",
    dot: "bg-red-400",
    card: "bg-red-500/5 border border-red-500/15",
    active: "bg-red-500/20 text-red-300 border border-red-500/30",
  },
  casual: {
    pill: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    dot: "bg-sky-400",
    card: "bg-sky-500/5 border border-sky-500/15",
    active: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
  },
  vacation: {
    pill: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
    dot: "bg-violet-400",
    card: "bg-violet-500/5 border border-violet-500/15",
    active: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  },
};

const statusConfig = {
  pending: "bg-sky-500/10 text-sky-400",
  approved: "bg-emerald-500/10 text-emerald-400",
  rejected: "bg-red-500/10 text-red-400",
  cancelled: "bg-slate-700/30 text-slate-400",
};

const MyLeave = ({
  employeeData = {},
  applyLeave,
  cancelLeave,
}) => {
  const [showForm, setShowForm] = useState(false);

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
  });

  const leaveRequests =
    employeeData?.leaveRequests || [];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const monthName =
    currentDate.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  const totalDays = (start, end) =>
    Math.ceil(
      (new Date(end) - new Date(start)) /
        86400000
    ) + 1;

  const stats = [
    {
      label: "Applied",
      value: leaveRequests.length,
      color: "text-slate-200",
    },
    {
      label: "Pending",
      value: leaveRequests.filter(
        (l) => l.status === "pending"
      ).length,
      color: "text-sky-400",
    },
    {
      label: "Approved",
      value: leaveRequests.filter(
        (l) => l.status === "approved"
      ).length,
      color: "text-emerald-400",
    },
    {
      label: "Rejected",
      value: leaveRequests.filter(
        (l) => l.status === "rejected"
      ).length,
      color: "text-red-400",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.startDate ||
      !form.endDate ||
      !form.leaveType ||
      !form.reason
    ) {
      setError("Please fill all fields.");
      return;
    }

    setError("");
    setSubmitted(true);

    applyLeave?.(form);

    setTimeout(() => {
      setSubmitted(false);

      setForm({
        startDate: "",
        endDate: "",
        leaveType: "",
        reason: "",
      });

      setShowForm(false);
    }, 1200);
  };

  return (
    <div className="p-5">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">
            My Leave
          </h1>

          <p className="text-slate-500 text-sm">
            Track and manage your leave
            requests
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} />
          Apply Leave
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-[#10111C] border border-[#1E2235] rounded-xl p-4"
          >
            <p
              className={`text-2xl font-semibold ${item.color}`}
            >
              {item.value}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Content */}

      <div className="grid grid-cols-2 gap-4">

        {/* Calendar */}

        <div className="bg-[#10111C] border border-[#1E2235] rounded-xl p-5">

          <div className="flex justify-between mb-4">
            <h2 className="text-slate-200 font-semibold">
              {monthName}
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      year,
                      month - 1,
                      1
                    )
                  )
                }
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      year,
                      month + 1,
                      1
                    )
                  )
                }
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
              (d) => (
                <div
                  key={d}
                  className="text-center text-xs text-slate-500"
                >
                  {d}
                </div>
              )
            )}

            {Array.from({
              length: firstDay,
            }).map((_, i) => (
              <div key={i}></div>
            ))}

            {Array.from({
              length: daysInMonth,
            }).map((_, i) => (
              <div
                key={i}
                className="text-center py-2 rounded-lg text-slate-300 hover:bg-slate-800"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* History */}

        <div className="bg-[#10111C] border border-[#1E2235] rounded-xl p-5">

          <h2 className="text-slate-200 font-semibold mb-4">
            Leave History
          </h2>

          {leaveRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-56">
              <Calendar
                size={30}
                className="text-slate-700 mb-3"
              />

              <p className="text-slate-500">
                No leave requests
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {[...leaveRequests]
                .reverse()
                .map((req) => {
                  const tc =
                    typeColors[
                      req.leaveType
                    ] ||
                    typeColors.casual;

                  return (
                    <div
                      key={req.id}
                      className={`p-3 rounded-xl ${tc.card}`}
                    >
                      <div className="flex justify-between mb-2">

                        <span
                          className={`text-xs px-2 py-1 rounded-full ${tc.pill}`}
                        >
                          {req.leaveType}
                        </span>

                        <div className="flex items-center gap-2">

                          <span
                            className={`text-xs px-2 py-1 rounded-full ${statusConfig[req.status]}`}
                          >
                            {req.status}
                          </span>

                          {req.status ===
                            "pending" && (
                            <button
                              onClick={() =>
                                cancelLeave?.(
                                  req.id
                                )
                              }
                            >
                              <X
                                size={14}
                                className="text-red-400"
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-slate-300">
                        {req.startDate} →{" "}
                        {req.endDate}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {req.reason}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="w-[460px] bg-[#10111C] border border-[#1E2235] rounded-2xl p-7">

            <h2 className="text-lg text-white font-semibold mb-4">
              Apply Leave
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <select
                value={form.leaveType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    leaveType:
                      e.target.value,
                  })
                }
                className="w-full bg-slate-800 rounded-lg p-3"
              >
                <option value="">
                  Select Type
                </option>
                <option value="sick">
                  Sick
                </option>
                <option value="casual">
                  Casual
                </option>
                <option value="vacation">
                  Vacation
                </option>
              </select>

              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    startDate:
                      e.target.value,
                  })
                }
                className="w-full bg-slate-800 rounded-lg p-3"
              />

              <input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    endDate:
                      e.target.value,
                  })
                }
                className="w-full bg-slate-800 rounded-lg p-3"
              />

              <textarea
                rows="3"
                placeholder="Reason..."
                value={form.reason}
                onChange={(e) =>
                  setForm({
                    ...form,
                    reason:
                      e.target.value,
                  })
                }
                className="w-full bg-slate-800 rounded-lg p-3"
              />

              {error && (
                <p className="text-red-400 text-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl"
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} />
                    Submitted
                  </span>
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