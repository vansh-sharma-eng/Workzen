import { useContext, useRef, useState, useEffect, useCallback } from "react";
import {
  Plus, Search, ChevronDown, Check, MoreVertical,
  Pencil, Trash2, X, Mail, ChevronLeft, ChevronRight, Loader2, AlertCircle,
  UserCheck, ThumbsUp, ThumbsDown, Clock, KeyRound, Download,
} from "lucide-react";
import { AuthContext } from "../../Components/Context/AuthProvider";
import CreateEmployee from "../../Components/Admin/CreateEmployees/CreateEmployee";
import ResetPasswordModal from "../../Components/Shared/ResetPasswordModal";
import { employeeApi, employeeRequestApi, leaveApi } from "../../api";
import { exportToCsv } from "../../Utils/exportToCsv";

const DEPARTMENTS = [
  "Engineering", "Design", "Marketing", "Sales", "Finance",
  "Operations", "Human Resources", "Product", "Analytics", "HR",
  "Backend", "Frontend", "Management", "Customer Support",
];

const ROLES = ["ADMIN", "HR", "EMPLOYEE"];

const AVATAR_COLORS = [
  "bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500",
  "bg-rose-500", "bg-teal-500", "bg-indigo-500", "bg-orange-500",
  "bg-cyan-500", "bg-pink-500",
];

const DEPT_COLORS = {
  Engineering:       "text-blue-400",
  Design:            "text-pink-400",
  Marketing:         "text-purple-400",
  Sales:             "text-green-400",
  Finance:           "text-red-400",
  Operations:        "text-orange-400",
  "Human Resources": "text-teal-400",
  Product:           "text-amber-400",
  Analytics:         "text-cyan-400",
  HR:                "text-violet-400",
  Backend:           "text-sky-400",
  Frontend:          "text-fuchsia-400",
  Management:        "text-lime-400",
  "Customer Support": "text-rose-400",
};

const PAGE_SIZE = 8;

const getInitials = (name) => {
  const parts = (name || "").trim().split(/\s+/);
  return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase() || "?";
};

const formatJoinDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" });
};

/** Real status: active (default), inactive (deactivated), or on leave today (cross-referenced from real leave data). */
const getStatus = (emp, onLeaveIds) => {
  if (onLeaveIds.has(emp.id)) return "leave";
  if (emp.isActive === false) return "inactive";
  return "active";
};

const StatusBadge = ({ status }) => {
  const styles = {
    active:   "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    leave:    "bg-amber-500/10  text-amber-400  border border-amber-500/20",
    inactive: "bg-slate-500/10  text-slate-400  border border-slate-500/20",
  };
  const labels = { active: "Active", leave: "On Leave", inactive: "Inactive" };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const FilterDropdown = ({ label, options, value, onChange, renderOption }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-4 py-2.5 bg-[#151822] border rounded-xl text-sm transition-all min-w-[140px] justify-between
          ${open
            ? "border-[#3b82f6] text-[#f1f5f9]"
            : "border-[#1e2333] text-[#94a3b8] hover:border-[#2a3347]"}`}
      >
        <span>{(renderOption ? renderOption(value) : value) || label}</span>
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 bg-[#151822] border border-[#1e2333] rounded-xl z-50 shadow-2xl min-w-[180px] py-1 overflow-hidden max-h-72 overflow-y-auto">
          <div
            onClick={() => { onChange(""); setOpen(false); }}
            className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-all
              ${!value ? "text-[#f1f5f9]" : "text-[#64748b] hover:bg-[#1e2333] hover:text-[#f1f5f9]"}`}
          >
            <span>{label}</span>
            {!value && <Check size={13} className="text-[#3b82f6]" />}
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-all
                ${value === opt
                  ? "text-[#f1f5f9] bg-[#1e2333]"
                  : "text-[#64748b] hover:bg-[#1e2333] hover:text-[#f1f5f9]"}`}
            >
              <span>{renderOption ? renderOption(opt) : opt}</span>
              {value === opt && <Check size={13} className="text-[#3b82f6]" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ActionsMenu = ({ employee, onEdit, onDelete, onResetPassword }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-lg text-[#64748b] hover:text-[#f1f5f9] hover:bg-[#1e2333] transition-all"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+4px)] bg-[#151822] border border-[#1e2333] rounded-xl z-50 shadow-2xl w-44 py-1 overflow-hidden">
          <button
            onClick={() => { onEdit(employee); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#94a3b8] hover:bg-[#1e2333] hover:text-[#f1f5f9] transition-all"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            onClick={() => { onResetPassword(employee); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#94a3b8] hover:bg-[#1e2333] hover:text-[#f1f5f9] transition-all"
          >
            <KeyRound size={13} /> Reset Password
          </button>
          <button
            onClick={() => { onDelete(employee); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

const EditModal = ({ employee, hrOptions, onClose, onSave }) => {
  const [form, setForm] = useState({
    name:       employee.name       || "",
    position:   employee.position   || "",
    department: employee.department || "",
    role:       employee.role       || "EMPLOYEE",
    active:     employee.isActive !== false,
    salary:     employee.salary != null ? String(employee.salary) : "",
    managerId:  employee.managerId != null ? String(employee.managerId) : "",
  });
  const [deptOpen, setDeptOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inp = "w-full bg-[#0d0f14] border border-[#1e2333] rounded-xl py-2.5 px-4 text-sm text-[#f1f5f9] placeholder-[#2a3244] outline-none focus:border-[#3b82f6] transition-colors";
  const lbl = "text-[10.5px] font-medium tracking-widest uppercase text-[#64748b] block mb-1.5";
  const set  = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Name can't be empty.");
      return;
    }
    if (form.salary && (isNaN(Number(form.salary)) || Number(form.salary) < 0)) {
      setError("Salary must be a valid positive number.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSave(employee, form);
    } catch (err) {
      setError(err.message || "Couldn't save changes.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-start sm:items-center justify-center p-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-[540px] my-4 sm:my-0 max-h-[92vh] overflow-y-auto bg-[#151822] border border-[#1e2333] rounded-2xl px-5 sm:px-8 py-6 sm:py-7 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#64748b] hover:text-[#f1f5f9] transition-colors">
          <X size={18} />
        </button>

        <h2 className="text-[#f1f5f9] text-lg font-semibold mb-1">Edit Employee</h2>
        <p className="text-[#64748b] text-xs mb-6">Update employee information</p>

        <div className="space-y-4">
          <div>
            <label className={lbl}>Full Name</label>
            <input className={inp} value={form.name} onChange={set("name")} placeholder="Full name" />
          </div>

          <div>
            <label className={lbl}>Job Title</label>
            <input className={inp} value={form.position} onChange={set("position")} placeholder="e.g. Senior Software Engineer" />
          </div>

          <div>
            <label className={lbl}>Email (fixed)</label>
            <input className={`${inp} opacity-60 cursor-not-allowed`} value={employee.email || ""} disabled />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Role</label>
              <select className={inp} value={form.role} onChange={set("role")}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className={lbl}>Department</label>
              <button
                type="button"
                onClick={() => setDeptOpen((o) => !o)}
                className={`w-full bg-[#0d0f14] border rounded-xl py-2.5 px-4 text-sm flex items-center justify-between outline-none transition-colors
                  ${deptOpen ? "border-[#3b82f6] text-[#f1f5f9]" : "border-[#1e2333] text-[#f1f5f9]"}`}
              >
                <span>{form.department || "Select department"}</span>
                <ChevronDown size={13} className={`text-[#64748b] transition-transform ${deptOpen ? "rotate-180" : ""}`} />
              </button>
              {deptOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[#151822] border border-[#1e2333] rounded-xl z-50 shadow-xl max-h-40 overflow-y-auto">
                  {DEPARTMENTS.map((d) => (
                    <div
                      key={d}
                      onClick={() => { setForm((f) => ({ ...f, department: d })); setDeptOpen(false); }}
                      className={`flex items-center justify-between px-4 py-2.5 text-xs cursor-pointer transition-all
                        ${form.department === d
                          ? "text-[#60a5fa] bg-[#1e2333]"
                          : "text-[#64748b] hover:bg-[#1e2333] hover:text-[#f1f5f9]"}`}
                    >
                      <span>{d}</span>
                      {form.department === d && <Check size={12} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Salary (Monthly)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={inp}
                value={form.salary}
                onChange={set("salary")}
                placeholder="e.g. 55000"
              />
            </div>

            <div>
              <label className={lbl}>Assign to HR / Team</label>
              <select className={inp} value={form.managerId} onChange={set("managerId")}>
                <option value="">— No team —</option>
                {hrOptions.map((h) => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active toggle — the only status field editable here; "On Leave" comes from real leave approvals. */}
          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
              className={`relative w-10 h-5 rounded-full transition-all duration-300 ${form.active ? "bg-emerald-500" : "bg-[#1e2333]"}`}
            >
              <span
                className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${form.active ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <span className="text-sm text-[#94a3b8]">Active account (unchecking blocks their login)</span>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-2.5 text-sm">
            <AlertCircle size={14} className="shrink-0" /> {error}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl text-sm border border-[#1e2333] text-[#94a3b8] hover:bg-[#1e2333] transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl text-sm bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ employee, onClose, onConfirm }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setDeleting(true);
    setError("");
    try {
      await onConfirm(employee);
    } catch (err) {
      setError(err.message || "Couldn't delete this employee.");
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-[400px] bg-[#151822] border border-[#1e2333] rounded-2xl px-6 sm:px-8 py-7">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
          <Trash2 size={20} className="text-rose-400" />
        </div>
        <h2 className="text-[#f1f5f9] text-lg font-semibold mb-1">Delete Employee</h2>
        <p className="text-[#64748b] text-sm mb-6">
          Are you sure you want to delete <span className="text-[#f1f5f9] font-medium">{employee.name}</span>?
          This permanently removes their account and cannot be undone.
        </p>
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-2.5 text-sm">
            <AlertCircle size={14} className="shrink-0" /> {error}
          </div>
        )}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 py-2.5 rounded-xl text-sm border border-[#1e2333] text-[#94a3b8] hover:bg-[#1e2333] transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 py-2.5 rounded-xl text-sm bg-rose-500 text-white hover:bg-rose-600 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {deleting && <Loader2 size={14} className="animate-spin" />}
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const PendingRequestsPanel = ({ onClose, onReviewed }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [salaryDrafts, setSalaryDrafts] = useState({});
  const [rejectingId, setRejectingId] = useState(null);
  const [reason, setReason] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await employeeRequestApi.getAll("PENDING");
      setRequests(data || []);
    } catch (err) {
      setError(err.message || "Couldn't load pending requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load();
  }, []);

  const handleApprove = async (req) => {
    setBusyId(req.id);
    setError("");
    try {
      const salaryStr = salaryDrafts[req.id];
      const salary = salaryStr && !isNaN(Number(salaryStr)) ? Number(salaryStr) : undefined;
      await employeeRequestApi.approve(req.id, salary != null ? { salary } : {});
      setRequests((prev) => prev.filter((r) => r.id !== req.id));
      onReviewed?.();
    } catch (err) {
      setError(err.message || "Couldn't approve this request.");
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (req) => {
    setBusyId(req.id);
    setError("");
    try {
      await employeeRequestApi.reject(req.id, { reason });
      setRequests((prev) => prev.filter((r) => r.id !== req.id));
      setRejectingId(null);
      setReason("");
      onReviewed?.();
    } catch (err) {
      setError(err.message || "Couldn't reject this request.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-4 sm:my-0 max-h-[92vh] overflow-y-auto bg-[#10111C] border border-[#1E2235] rounded-2xl p-5 sm:p-8 relative">
        <button onClick={onClose} className="absolute right-4 top-4 sm:right-5 sm:top-5 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 pr-8">HR Employee Requests</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Review employees that HR wants to add to their team. Approving creates the account; you can set a starting salary here or edit it later.
        </p>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-10 text-[#64748b] gap-2 text-sm">
            <Loader2 size={16} className="animate-spin" /> Loading requests…
          </div>
        ) : requests.length === 0 ? (
          <div className="py-10 text-center text-[#64748b] text-sm">No pending requests. You're all caught up.</div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className="bg-[#151822] border border-[#1e2333] rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-[#f1f5f9] text-sm font-semibold">{req.name}</p>
                    <p className="text-[#64748b] text-xs mt-0.5">{req.email}</p>
                    <p className="text-[#64748b] text-xs mt-0.5">
                      {req.department || "—"} {req.position ? `· ${req.position}` : ""}
                    </p>
                    <p className="text-[#3b82f6] text-xs mt-1.5 flex items-center gap-1">
                      <UserCheck size={12} /> Requested by {req.requestedByName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="Starting salary"
                      className="w-32 bg-[#0d0f14] border border-[#1e2333] rounded-lg py-2 px-3 text-xs text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#3b82f6]"
                      value={salaryDrafts[req.id] || ""}
                      onChange={(e) => setSalaryDrafts((d) => ({ ...d, [req.id]: e.target.value }))}
                    />
                    <button
                      onClick={() => handleApprove(req)}
                      disabled={busyId === req.id}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium disabled:opacity-60"
                    >
                      {busyId === req.id ? <Loader2 size={13} className="animate-spin" /> : <ThumbsUp size={13} />}
                      Approve
                    </button>
                    <button
                      onClick={() => setRejectingId(rejectingId === req.id ? null : req.id)}
                      disabled={busyId === req.id}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 text-xs font-medium disabled:opacity-60"
                    >
                      <ThumbsDown size={13} /> Reject
                    </button>
                  </div>
                </div>

                {rejectingId === req.id && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Reason (optional)"
                      className="flex-1 bg-[#0d0f14] border border-[#1e2333] rounded-lg py-2 px-3 text-xs text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#3b82f6]"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    <button
                      onClick={() => handleReject(req)}
                      disabled={busyId === req.id}
                      className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium disabled:opacity-60"
                    >
                      Confirm Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const AdminEmployeesPage = ({ sidebarCollapsed }) => {
  const { userData, refreshData } = useContext(AuthContext);

  const [search,       setSearch]       = useState("");
  const [deptFilter,   setDeptFilter]   = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page,         setPage]         = useState(1);
  const [showAdd,      setShowAdd]      = useState(false);
  const [editEmp,      setEditEmp]      = useState(null);
  const [deleteEmp,    setDeleteEmp]    = useState(null);
  const [resetPasswordEmp, setResetPasswordEmp] = useState(null);
  const [onLeaveIds,   setOnLeaveIds]   = useState(new Set());
  const [pageError,    setPageError]    = useState("");
  const [showRequests, setShowRequests] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const loadPendingCount = useCallback(async () => {
    try {
      const pending = await employeeRequestApi.getAll("PENDING");
      setPendingCount((pending || []).length);
    } catch {
      // Non-critical — badge just stays at its last known value.
    }
  }, []);

  const loadOnLeaveToday = useCallback(async () => {
    try {
      const leaves = await leaveApi.getAll();
      const todayIso = new Date().toISOString().slice(0, 10);
      const ids = new Set(
        leaves
          .filter((l) => l.status === "APPROVED" && l.fromDate <= todayIso && l.toDate >= todayIso)
          .map((l) => l.employeeId)
      );
      setOnLeaveIds(ids);
    } catch {
      // Non-critical — status just falls back to active/inactive without the "on leave" overlay.
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    refreshData();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadOnLeaveToday();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadPendingCount();
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset pagination when filters change
    setPage(1);
  }, [search, deptFilter, statusFilter]);

  const employees   = userData.employeesData || [];
  const hrOptions   = userData.hrData || [];
  const uniqueDepts = [...new Set(employees.map((e) => e.department).filter(Boolean))];

  const filtered = employees.filter((emp) => {
    const matchSearch =
      (emp.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (emp.email || "").toLowerCase().includes(search.toLowerCase());
    const matchDept   = !deptFilter   || emp.department === deptFilter;
    const matchStatus = !statusFilter || getStatus(emp, onLeaveIds) === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = {
    total:    employees.length,
    active:   employees.filter((e) => getStatus(e, onLeaveIds) === "active").length,
    leave:    employees.filter((e) => getStatus(e, onLeaveIds) === "leave").length,
    inactive: employees.filter((e) => getStatus(e, onLeaveIds) === "inactive").length,
  };

  // ── handlers — all go through the real backend, then resync from it ──
  const handleEdit = async (employee, form) => {
    setPageError("");
    await employeeApi.update(employee.id, {
      name: form.name.trim(),
      department: form.department,
      position: form.position,
      active: form.active,
      salary: form.salary !== "" ? Number(form.salary) : null,
      managerId: form.managerId !== "" ? Number(form.managerId) : null,
    });
    if (form.role && form.role !== employee.role) {
      await employeeApi.updateRole(employee.id, form.role);
    }
    await refreshData();
    setEditEmp(null);
  };

  const handleDelete = async (employee) => {
    setPageError("");
    await employeeApi.remove(employee.id);
    await refreshData();
    setDeleteEmp(null);
  };

  const handleResetPassword = async (employee) => {
    setPageError("");
    const result = await employeeApi.resetPassword(employee.id);
    return result.temporaryPassword;
  };

  const handleExport = () => {
    exportToCsv(
      `employees-${new Date().toISOString().slice(0, 10)}`,
      [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "department", label: "Department" },
        { key: "position", label: "Position" },
        { key: "status", label: "Status" },
        { key: "joinDate", label: "Join Date" },
      ],
      filtered.map((emp) => ({
        ...emp,
        status: getStatus(emp, onLeaveIds),
        joinDate: formatJoinDate(emp.createdAt),
      }))
    );
  };

  // ── pagination helpers ──
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("…");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className={`
        transition-all
        duration-300
        ${
          sidebarCollapsed
            ? "ml-17 w-[calc(100%-4rem)]"
            : "ml-57 w-[calc(100%-14rem)]"
        }
      `}>
      {/* ── Modals ── */}
      {showAdd && (
        <CreateEmployee setOpenEmployeeForm={setShowAdd} />
      )}
      {editEmp && (
        <EditModal
          employee={editEmp}
          hrOptions={hrOptions}
          onClose={() => setEditEmp(null)}
          onSave={handleEdit}
        />
      )}
      {showRequests && (
        <PendingRequestsPanel
          onClose={() => setShowRequests(false)}
          onReviewed={() => { refreshData(); loadPendingCount(); }}
        />
      )}
      {deleteEmp && (
        <DeleteModal
          employee={deleteEmp}
          onClose={() => setDeleteEmp(null)}
          onConfirm={handleDelete}
        />
      )}
      {resetPasswordEmp && (
        <ResetPasswordModal
          employee={resetPasswordEmp}
          onClose={() => setResetPasswordEmp(null)}
          onConfirm={handleResetPassword}
        />
      )}

      {pageError && (
        <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-2.5 text-sm">
          <AlertCircle size={14} className="shrink-0" /> {pageError}
        </div>
      )}

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 bg-[#151822] border border-[#1e2333] rounded-xl py-2.5 pl-9 pr-4 text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>

          {/* Dept filter */}
          <FilterDropdown
            label="All Departments"
            options={uniqueDepts.length ? uniqueDepts : DEPARTMENTS}
            value={deptFilter}
            onChange={setDeptFilter}
          />
        </div>

        {/* Add Employee */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRequests(true)}
            className="relative flex items-center gap-2 bg-[#151822] hover:bg-[#1e2333] border border-[#1e2333] text-[#94a3b8] text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
          >
            <Clock size={15} />
            HR Requests
            {pendingCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-500 text-[10px] font-bold text-black flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={handleExport}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 bg-[#151822] hover:bg-[#1e2333] border border-[#1e2333] text-[#94a3b8] text-sm font-medium px-4 py-2.5 rounded-xl transition-all disabled:opacity-40"
          >
            <Download size={15} />
            Export CSV
          </button>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="flex items-center gap-5 mb-5 flex-wrap">
        {[
          { label: "Total",    value: stats.total,    dot: "bg-blue-400"    },
          { label: "Active",   value: stats.active,   dot: "bg-emerald-400" },
          { label: "On Leave", value: stats.leave,    dot: "bg-amber-400"   },
          { label: "Inactive", value: stats.inactive, dot: "bg-slate-400"   },
        ].map(({ label, value, dot }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dot}`} />
            <span className="text-[#64748b] text-sm">{label}</span>
            <span className="text-[#f1f5f9] text-sm font-bold">{value}</span>
          </div>
        ))}

        <div className="ml-auto">
          <FilterDropdown
            label="All Status"
            options={["active", "leave", "inactive"]}
            value={statusFilter}
            onChange={setStatusFilter}
            renderOption={(v) => ({ active: "Active", leave: "On Leave", inactive: "Inactive" }[v] || v)}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-[#151822] border border-[#1e2333] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2333]">
                {["Employee", "Department", "Team (HR)", "Email", "Joined", "Status", ""].map((col) => (
                  <th
                    key={col}
                    className="text-left px-5 py-3.5 text-xs font-semibold text-[#64748b] uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-[#64748b] text-sm">
                    {employees.length === 0
                      ? "No employees yet. Add your first employee!"
                      : "No employees match your search."}
                  </td>
                </tr>
              ) : (
                pageData.map((emp, i) => {
                  const colorIdx = (i + (page - 1) * PAGE_SIZE) % AVATAR_COLORS.length;
                  const status = getStatus(emp, onLeaveIds);
                  return (
                    <tr
                      key={emp.id}
                      className="border-b border-[#1e2333] last:border-0 hover:bg-[#1a1f2e] transition-colors"
                    >
                      {/* Employee */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${AVATAR_COLORS[colorIdx]}`}>
                            {getInitials(emp.name)}
                          </div>
                          <div>
                            <p className="text-[#f1f5f9] text-sm font-medium whitespace-nowrap">
                              {emp.name}
                            </p>
                            <p className="text-[#64748b] text-xs whitespace-nowrap">
                              {emp.position || emp.role || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="px-5 py-4">
                        <span className={`text-sm font-medium ${DEPT_COLORS[emp.department] || "text-[#94a3b8]"}`}>
                          {emp.department || "—"}
                        </span>
                      </td>

                      {/* Team (HR) */}
                      <td className="px-5 py-4">
                        <span className="text-xs text-[#94a3b8]">
                          {emp.managerName || <span className="text-[#475569]">Unassigned</span>}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                          <Mail size={11} className="text-[#64748b] shrink-0" />
                          <span className="whitespace-nowrap">{emp.email || "—"}</span>
                        </div>
                      </td>

                      {/* Joined */}
                      <td className="px-5 py-4 text-[#94a3b8] text-sm whitespace-nowrap">
                        {formatJoinDate(emp.createdAt)}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={status} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <ActionsMenu
                          employee={emp}
                          onEdit={setEditEmp}
                          onDelete={setDeleteEmp}
                          onResetPassword={setResetPasswordEmp}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination footer ── */}
        <div className="px-5 py-4 border-t border-[#1e2333] flex items-center justify-between flex-wrap gap-3">
          <p className="text-[#64748b] text-sm">
            {pageData.length === 0
              ? "No results"
              : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} employees`}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg text-[#64748b] hover:text-[#f1f5f9] hover:bg-[#1e2333] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={15} />
            </button>

            {pageNumbers.map((p, idx) =>
              p === "…" ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-[#64748b] text-sm">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-all
                    ${page === p
                      ? "bg-[#3b82f6] text-white"
                      : "text-[#64748b] hover:bg-[#1e2333] hover:text-[#f1f5f9]"}`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg text-[#64748b] hover:text-[#f1f5f9] hover:bg-[#1e2333] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployeesPage;
