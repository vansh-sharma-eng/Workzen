import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Calendar,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import leaveApi from "../../../api/leaveApi";

const TYPE_OPTIONS = [
  { value: "SICK", label: "Sick" },
  { value: "CASUAL", label: "Casual" },
  { value: "PAID", label: "Paid / Vacation" },
  { value: "UNPAID", label: "Unpaid" },
];

const typeColors = {
  SICK: {
    pill: "bg-red-500/10 text-red-400 border border-red-500/20",
    card: "bg-red-500/5 border border-red-500/15",
    dot: "bg-red-400",
  },
  CASUAL: {
    pill: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    card: "bg-amber-500/5 border border-amber-500/15",
    dot: "bg-amber-400",
  },
  PAID: {
    pill: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
    card: "bg-violet-500/5 border border-violet-500/15",
    dot: "bg-violet-400",
  },
  UNPAID: {
    pill: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    card: "bg-sky-500/5 border border-sky-500/15",
    dot: "bg-sky-400",
  },
};

const statusConfig = {
  PENDING: "bg-sky-500/10 text-sky-400",
  APPROVED: "bg-emerald-500/10 text-emerald-400",
  REJECTED: "bg-red-500/10 text-red-400",
  CANCELLED: "bg-slate-700/30 text-slate-400",
};

const toIso = (date) => date.toISOString().slice(0, 10);

/** Employee's own "My Leave" page — real backend, scoped to their own leave requests. */
const MyLeave = ({ data }) => {
  const employeeId = data?.id;

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const [form, setForm] = useState({ startDate: "", endDate: "", leaveType: "", reason: "" });

  const load = useCallback(async () => {
    if (!employeeId) return;
    setLoading(true);
    setLoadError("");
    try {
      const [leavesResult, balancesResult] = await Promise.all([
        leaveApi.getForEmployee(employeeId),
        leaveApi.getBalances(employeeId),
      ]);
      setLeaveRequests((leavesResult || []).sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)));
      setBalances(balancesResult || []);
    } catch (err) {
      setLoadError(err.message || "Couldn't load your leave history.");
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load();
  }, [load]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const leaveTypeForDay = (day) => {
    const dateIso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const hit = leaveRequests.find(
      (l) => (l.status === "APPROVED" || l.status === "PENDING") && dateIso >= l.fromDate && dateIso <= l.toDate
    );
    return hit?.type;
  };

  const stats = [
    { label: "Applied", value: leaveRequests.length, color: "text-slate-200" },
    { label: "Pending", value: leaveRequests.filter((l) => l.status === "PENDING").length, color: "text-sky-400" },
    { label: "Approved", value: leaveRequests.filter((l) => l.status === "APPROVED").length, color: "text-emerald-400" },
    { label: "Rejected", value: leaveRequests.filter((l) => l.status === "REJECTED").length, color: "text-red-400" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.startDate || !form.endDate || !form.leaveType || !form.reason.trim()) {
      setError("Please fill all fields.");
      return;
    }
    if (form.endDate < form.startDate) {
      setError("End date can't be before the start date.");
      return;
    }

    setSubmitting(true);
    try {
      await leaveApi.apply(employeeId, {
        type: form.leaveType,
        fromDate: form.startDate,
        toDate: form.endDate,
        reason: form.reason.trim(),
      });
      setSubmitted(true);
      await load();
      setTimeout(() => {
        setSubmitted(false);
        setForm({ startDate: "", endDate: "", leaveType: "", reason: "" });
        setShowForm(false);
      }, 1000);
    } catch (err) {
      setError(err.message || "Couldn't submit this request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (leaveId) => {
    setCancellingId(leaveId);
    try {
      await leaveApi.cancel(leaveId);
      await load();
    } catch (err) {
      setLoadError(err.message || "Couldn't cancel this request.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white">My Leave</h1>
          <p className="text-slate-500 text-sm">Track and manage your leave requests</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} />
          Apply Leave
        </button>
      </div>

      {loadError && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
          <AlertCircle size={14} className="shrink-0" /> {loadError}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((item) => (
          <div key={item.label} className="bg-[#10111C] border border-[#1E2235] rounded-xl p-4">
            <p className={`text-2xl font-semibold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-slate-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Leave balance */}
      {balances.length > 0 && (
        <div className="bg-[#10111C] border border-[#1E2235] rounded-xl p-5 mb-6">
          <h2 className="text-slate-200 font-semibold mb-4">Leave Balance — {new Date().getFullYear()}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {balances.map((b) => {
              const tc = typeColors[b.leaveType] || typeColors.CASUAL;
              const unlimited = b.allocatedDays < 0;
              const pct = unlimited ? 0 : Math.min(100, (b.usedDays / Math.max(1, b.allocatedDays)) * 100);
              return (
                <div key={b.leaveType} className={`rounded-xl p-3 ${tc.card}`}>
                  <p className="text-xs font-medium text-slate-300">
                    {TYPE_OPTIONS.find((t) => t.value === b.leaveType)?.label || b.leaveType}
                  </p>
                  <p className="text-xl font-semibold text-white mt-1">
                    {unlimited ? "Unlimited" : `${b.remainingDays} / ${b.allocatedDays}`}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {unlimited ? `${b.usedDays} days taken` : "days remaining"}
                  </p>
                  {!unlimited && (
                    <div className="h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className={`h-full rounded-full ${tc.dot}`} style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Calendar */}
        <div className="bg-[#10111C] border border-[#1E2235] rounded-xl p-5">
          <div className="flex justify-between mb-4">
            <h2 className="text-slate-200 font-semibold">{monthName}</h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
                <ChevronLeft size={16} className="text-slate-400" />
              </button>
              <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-center text-xs text-slate-500">{d}</div>
            ))}

            {Array.from({ length: firstDay }).map((_, i) => <div key={`pad-${i}`}></div>)}

            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const type = leaveTypeForDay(day);
              const todayIso = toIso(new Date());
              const cellIso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              return (
                <div
                  key={day}
                  className={`relative text-center py-2 rounded-lg text-slate-300 hover:bg-slate-800 ${cellIso === todayIso ? "ring-1 ring-violet-500/60" : ""}`}
                >
                  {day}
                  {type && (
                    <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${typeColors[type]?.dot || "bg-slate-400"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* History */}
        <div className="bg-[#10111C] border border-[#1E2235] rounded-xl p-5">
          <h2 className="text-slate-200 font-semibold mb-4">Leave History</h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-56 text-slate-500 gap-2">
              <Loader2 size={22} className="animate-spin" />
              Loading…
            </div>
          ) : leaveRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-56">
              <Calendar size={30} className="text-slate-700 mb-3" />
              <p className="text-slate-500">No leave requests</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {leaveRequests.map((req) => {
                const tc = typeColors[req.type] || typeColors.CASUAL;
                return (
                  <div key={req.id} className={`p-3 rounded-xl ${tc.card}`}>
                    <div className="flex justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${tc.pill}`}>
                        {TYPE_OPTIONS.find((t) => t.value === req.type)?.label || req.type}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[req.status]}`}>
                          {req.status}
                        </span>

                        {req.status === "PENDING" && (
                          <button onClick={() => handleCancel(req.id)} disabled={cancellingId === req.id} title="Withdraw request">
                            {cancellingId === req.id
                              ? <Loader2 size={14} className="text-slate-400 animate-spin" />
                              : <X size={14} className="text-red-400" />}
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-slate-300">{req.fromDate} → {req.toDate}</p>
                    <p className="text-xs text-slate-500 mt-1">{req.reason}</p>
                    {req.decidedByName && (
                      <p className="text-xs text-slate-600 mt-1">By {req.decidedByName}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-[460px] bg-[#10111C] border border-[#1E2235] rounded-2xl p-7 relative">
            <button onClick={() => setShowForm(false)} className="absolute right-5 top-5 text-slate-400 hover:text-white">
              <X size={18} />
            </button>

            <h2 className="text-lg text-white font-semibold mb-4">Apply Leave</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={form.leaveType}
                onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
                className="w-full bg-slate-800 rounded-lg p-3 text-white text-sm"
              >
                <option value="">Select Type</option>
                {TYPE_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>

              {form.leaveType && (() => {
                const b = balances.find((bal) => bal.leaveType === form.leaveType);
                if (!b) return null;
                return (
                  <p className="text-xs text-slate-500 -mt-2">
                    {b.allocatedDays < 0
                      ? "Unpaid leave is uncapped."
                      : `${b.remainingDays} of ${b.allocatedDays} days remaining this year.`}
                  </p>
                );
              })()}

              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-slate-800 rounded-lg p-3 text-white text-sm"
              />

              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-slate-800 rounded-lg p-3 text-white text-sm"
              />

              <textarea
                rows="3"
                placeholder="Reason..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full bg-slate-800 rounded-lg p-3 text-white text-sm"
              />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} />
                    Submitted
                  </span>
                ) : submitting ? "Submitting…" : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLeave;
