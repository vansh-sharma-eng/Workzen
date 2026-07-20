import { useCallback, useEffect, useState } from "react";
import { leaveApi } from "../../api";
import { exportToCsv } from "../../Utils/exportToCsv";
import TeamCalendar from "../../Components/HR/Leave/TeamCalendar";
import {
  Check,
  X,
  CalendarDays,
  Clock,
  Trash2,
  Download,
} from "lucide-react";

const FILTERS = ["All", "Pending", "Approved", "Rejected"];

const AdminLeavePage = ({ sidebarCollapsed }) => {
  const [allRequests, setAllRequests] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [filter, setFilter] = useState("All");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const requests = await leaveApi.getAll();
      setAllRequests(
        [...requests].sort(
          (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)
        )
      );
      setStatus("ready");
    } catch (err) {
      setError(err.message || "Failed to load leave requests.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    // Intentional fetch-on-mount: load is also exposed for manual refresh.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const pendingRequests = allRequests.filter((req) => req.status === "PENDING");
  const approvedRequests = allRequests.filter((req) => req.status === "APPROVED");
  const rejectedRequests = allRequests.filter((req) => req.status === "REJECTED");

  const visibleRequests = allRequests.filter((req) => {
    if (filter === "All") return true;
    return req.status === filter.toUpperCase();
  });

  const updateLeave = async (leaveId, decision) => {
    setBusyId(leaveId);
    try {
      await leaveApi.decide(leaveId, decision);
      await load();
    } catch (err) {
      setError(err.message || "Failed to update leave request.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (leaveId) => {
    setBusyId(leaveId);
    try {
      await leaveApi.remove(leaveId);
      setConfirmDeleteId(null);
      await load();
    } catch (err) {
      setError(err.message || "Failed to delete this leave record.");
    } finally {
      setBusyId(null);
    }
  };

  const totalDays = (start, end) => {
    return (
      Math.ceil(
        (new Date(end) - new Date(start)) /
          (1000 * 60 * 60 * 24)
      ) + 1
    );
  };

  return (
    <div
      className={`
      mt-16 
      transition-all duration-300
      ${
        sidebarCollapsed
          ? "ml-16 w-[calc(100%-4rem)]"
          : "ml-56 w-[calc(100%-14rem)]"
      }
    `}
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
        <div className="bg-[#0F1324] border border-[#20263A] rounded-md h-20 w-full p-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-amber-500/10 flex items-center justify-center">
              <Clock size={18} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {pendingRequests.length}
              </h2>
              <p className="text-[#94A3B8]">Pending Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F1324] border border-[#20263A] rounded-md h-20 w-full p-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-emerald-500/10 flex items-center justify-center">
              <Check size={20} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {approvedRequests.length}
              </h2>
              <p className="text-[#94A3B8]">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F1324] border border-[#20263A] rounded-md h-20 w-full p-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-red-500/10 flex items-center justify-center">
              <X size={22} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {rejectedRequests.length}
              </h2>
              <p className="text-[#94A3B8]">Rejected</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F1324] border border-[#20263A] rounded-md h-20 w-full p-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-indigo-500/10 flex items-center justify-center">
              <CalendarDays size={22} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {approvedRequests.length}
              </h2>
              <p className="text-[#94A3B8]">On Leave (Approved)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Calendar toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowCalendar((v) => !v)}
          className="inline-flex items-center gap-2 bg-[#0F1324] border border-[#20263A] hover:border-indigo-500 text-white text-sm px-4 py-2 rounded-md transition"
        >
          <CalendarDays size={16} className="text-indigo-400" />
          {showCalendar ? "Hide Team Calendar" : "Show Team Calendar"}
        </button>

        {showCalendar && (
          <div className="mt-4">
            <TeamCalendar />
          </div>
        )}
      </div>

      {/* Leave Requests */}
      <div className="w-full bg-[#0F1324] border border-[#20263A] rounded-md overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-[#20263A] flex-wrap gap-3">
          <h2 className="text-md font-semibold text-white">
            Leave Requests — full history (employees &amp; HR)
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => exportToCsv(
                `leave-requests-${new Date().toISOString().slice(0, 10)}`,
                [
                  { key: "employeeName", label: "Employee" },
                  { key: "type", label: "Type" },
                  { key: "fromDate", label: "From" },
                  { key: "toDate", label: "To" },
                  { key: "status", label: "Status" },
                  { key: "reason", label: "Reason" },
                  { key: "decidedByName", label: "Decided By" },
                ],
                visibleRequests
              )}
              disabled={visibleRequests.length === 0}
              className="flex items-center gap-1.5 bg-[#0B0E1A] border border-[#20263A] hover:border-indigo-500 text-slate-300 text-xs font-medium px-3 py-2 rounded-md transition disabled:opacity-40"
            >
              <Download size={13} />
              Export CSV
            </button>

            <div className="flex items-center gap-1 bg-[#0B0E1A] rounded-md p-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    filter === f ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {status === "error" && (
          <div className="py-6 text-center text-red-400 text-sm">{error}</div>
        )}

        {status === "ready" && visibleRequests.length === 0 && (
          <div className="py-14 text-center">
            <CalendarDays
              size={40}
              className="mx-auto text-slate-600"
            />
            <h3 className="text-white text-md mt-4">
              No Leave Requests
            </h3>
            <p className="text-slate-400">
              {allRequests.length === 0
                ? "Employee leave requests will appear here"
                : `No ${filter.toLowerCase()} requests.`}
            </p>
          </div>
        )}

        {visibleRequests.map((req) => (
          <div
            key={req.id}
            className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 px-6 py-6 border-b border-[#20263A]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                {req.employeeName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div>
                <h3 className="text-white text-md font-semibold">
                  {req.employeeName}
                </h3>

                <p className="text-[#94A3B8]">
                  {req.reason}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300">
                {req.type}
              </span>

              <span className="text-slate-300 text-sm">
                {new Date(req.fromDate).toLocaleDateString()}
                {" → "}
                {new Date(req.toDate).toLocaleDateString()}
              </span>

              <span className="text-white text-sm font-semibold">
                {totalDays(req.fromDate, req.toDate)}d
              </span>

              {req.status === "PENDING" && (
                <>
                  <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 flex items-center gap-2">
                    <Clock size={14} />
                    Pending
                  </span>

                  <button
                    onClick={() => updateLeave(req.id, "APPROVED")}
                    disabled={busyId === req.id}
                    className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Check size={15} />
                    Approve
                  </button>

                  <button
                    onClick={() => updateLeave(req.id, "REJECTED")}
                    disabled={busyId === req.id}
                    className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center gap-2 disabled:opacity-50"
                  >
                    <X size={15} />
                    Reject
                  </button>
                </>
              )}

              {req.status === "APPROVED" && (
                <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center gap-2">
                  <Check size={14} />
                  Approved
                </span>
              )}

              {req.status === "REJECTED" && (
                <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 flex items-center gap-2">
                  <X size={14} />
                  Rejected
                </span>
              )}

              {confirmDeleteId === req.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Delete this record?</span>
                  <button
                    onClick={() => handleDelete(req.id)}
                    disabled={busyId === req.id}
                    className="px-2 py-1 rounded-md bg-rose-600 text-white text-xs hover:bg-rose-500 disabled:opacity-50"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="px-2 py-1 rounded-md border border-[#20263A] text-slate-300 text-xs hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDeleteId(req.id)}
                  title="Delete record"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeavePage;
