import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Loader2, AlertCircle, Check } from "lucide-react";

import EmployeeFilters from "./EmployeeFilters";
import EmployeeTable from "./EmployeeTable";
import HRAddEmployeeRequest from "./HRAddEmployeeRequest";
import ResetPasswordModal from "../../Shared/ResetPasswordModal";
import { employeeApi, leaveApi } from "../../../api";

const PAGE_SIZE = 8;

const DEPARTMENTS = [
  "Engineering", "Design", "Marketing", "Sales", "Finance",
  "Operations", "HR", "Product", "Analytics", "Backend", "Frontend", "Management",
];

const ViewModal = ({ employee, onClose }) => (
  <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-[#13141F] border border-[#1A2035] rounded-2xl p-6 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
        <X size={18} />
      </button>
      <h2 className="text-white text-lg font-semibold mb-4">{employee.name}</h2>
      <div className="space-y-2 text-sm">
        <p className="text-gray-400">Email: <span className="text-white">{employee.email}</span></p>
        <p className="text-gray-400">Title: <span className="text-white">{employee.position || "—"}</span></p>
        <p className="text-gray-400">Department: <span className="text-white">{employee.department || "—"}</span></p>
        <p className="text-gray-400">Status: <span className="text-white">{employee.isActive === false ? "Inactive" : "Active"}</span></p>
        <p className="text-gray-400">Joined: <span className="text-white">{employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : "—"}</span></p>
      </div>
    </div>
  </div>
);

const EditModal = ({ employee, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: employee.name || "",
    position: employee.position || "",
    department: employee.department || "",
    active: employee.isActive !== false,
  });
  const [deptOpen, setDeptOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inp = "w-full bg-[#0F111A] border border-[#1A2035] rounded-xl py-2.5 px-4 text-sm text-white placeholder-[#475569] outline-none focus:border-indigo-500 transition-colors";
  const lbl = "text-[10.5px] font-medium tracking-widest uppercase text-gray-500 block mb-1.5";

  const handleSave = async () => {
    if (!form.name.trim()) { setError("Name can't be empty."); return; }
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
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#13141F] border border-[#1A2035] rounded-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={18} />
        </button>
        <h2 className="text-white text-lg font-semibold mb-1">Edit Employee</h2>
        <p className="text-gray-500 text-xs mb-5">Salary is set by Admin only — not editable here.</p>

        <div className="space-y-4">
          <div>
            <label className={lbl}>Full Name</label>
            <input className={inp} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className={lbl}>Job Title</label>
            <input className={inp} value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} />
          </div>
          <div className="relative">
            <label className={lbl}>Department</label>
            <button
              type="button"
              onClick={() => setDeptOpen((o) => !o)}
              className={`${inp} flex items-center justify-between`}
            >
              <span>{form.department || "Select department"}</span>
            </button>
            {deptOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[#151822] border border-[#1e2333] rounded-xl z-50 shadow-xl max-h-40 overflow-y-auto">
                {DEPARTMENTS.map((d) => (
                  <div
                    key={d}
                    onClick={() => { setForm((f) => ({ ...f, department: d })); setDeptOpen(false); }}
                    className="flex items-center justify-between px-4 py-2.5 text-xs cursor-pointer hover:bg-[#1e2333] text-gray-300"
                  >
                    <span>{d}</span>
                    {form.department === d && <Check size={12} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
              className={`relative w-10 h-5 rounded-full transition-all ${form.active ? "bg-emerald-500" : "bg-[#1e2333]"}`}
            >
              <span className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.active ? "translate-x-5" : "translate-x-0"}`} />
            </button>
            <span className="text-sm text-gray-400">Active account</span>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-2.5 text-sm">
            <AlertCircle size={14} className="shrink-0" /> {error}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm border border-[#1e2333] text-gray-400 hover:bg-[#1e2333] disabled:opacity-50">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm bg-indigo-600 text-white hover:bg-indigo-700 font-medium flex items-center justify-center gap-2 disabled:opacity-70">
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

/** HR's own Employees page — scoped to their team only (managerId = current HR). */
const Employees = ({ data }) => {
  const hrId = data?.id;

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [onLeaveIds, setOnLeaveIds] = useState(new Set());

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);

  const [showAdd, setShowAdd] = useState(false);
  const [viewEmp, setViewEmp] = useState(null);
  const [editEmp, setEditEmp] = useState(null);
  const [resetPasswordEmp, setResetPasswordEmp] = useState(null);

  const load = useCallback(async () => {
    if (!hrId) return;
    setLoading(true);
    setError("");
    try {
      const [team, leaves] = await Promise.all([
        employeeApi.getByManager(hrId),
        leaveApi.getAll().catch(() => []),
      ]);
      const todayIso = new Date().toISOString().slice(0, 10);
      const leaveIds = new Set(
        (leaves || [])
          .filter((l) => l.status === "APPROVED" && l.fromDate <= todayIso && l.toDate >= todayIso)
          .map((l) => l.employeeId)
      );
      setOnLeaveIds(leaveIds);
      setEmployees(team || []);
    } catch (err) {
      setError(err.message || "Couldn't load your team.");
    } finally {
      setLoading(false);
    }
  }, [hrId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load();
  }, [load]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset pagination on filter change
    setPage(1);
  }, [search, deptFilter, statusFilter]);

  const enriched = employees.map((e) => ({ ...e, onLeave: onLeaveIds.has(e.id) }));

  const filtered = enriched.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      (e.name || "").toLowerCase().includes(q) ||
      (e.email || "").toLowerCase().includes(q) ||
      (e.position || "").toLowerCase().includes(q);
    const matchDept = !deptFilter || e.department === deptFilter;
    const status = e.onLeave ? "On Leave" : e.isActive === false ? "Inactive" : "Active";
    const matchStatus = !statusFilter || status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (sortBy === "oldest") return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    return (a.name || "").localeCompare(b.name || "");
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleEditSave = async (employee, form) => {
    await employeeApi.update(employee.id, {
      name: form.name.trim(),
      department: form.department,
      position: form.position,
      active: form.active,
    });
    await load();
    setEditEmp(null);
  };

  const handleResetPassword = async (employee) => {
    const result = await employeeApi.resetPassword(employee.id);
    return result.temporaryPassword;
  };

  return (
    <div className="min-h-screen w-[100%] bg-[#0F111A] text-white">
      {showAdd && (
        <HRAddEmployeeRequest onClose={() => setShowAdd(false)} onSubmitted={load} />
      )}
      {viewEmp && <ViewModal employee={viewEmp} onClose={() => setViewEmp(null)} />}
      {editEmp && <EditModal employee={editEmp} onClose={() => setEditEmp(null)} onSave={handleEditSave} />}
      {resetPasswordEmp && (
        <ResetPasswordModal
          employee={resetPasswordEmp}
          onClose={() => setResetPasswordEmp(null)}
          onConfirm={handleResetPassword}
        />
      )}

      <main>
        <div className="mt-2">
          <EmployeeFilters
            search={search} setSearch={setSearch}
            deptFilter={deptFilter} setDeptFilter={setDeptFilter}
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            sortBy={sortBy} setSortBy={setSortBy}
            onAddEmployee={() => setShowAdd(true)}
          />
        </div>

        <div className="mt-6">
          <EmployeeTable
            employees={pageData}
            loading={loading}
            error={error}
            totalCount={sorted.length}
            onView={setViewEmp}
            onEdit={setEditEmp}
            onResetPassword={setResetPasswordEmp}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
          <p className="text-xs text-gray-400">
            {sorted.length === 0
              ? "No results"
              : <>Showing <span className="text-white font-semibold">{(page - 1) * PAGE_SIZE + 1}</span> – <span className="text-white font-semibold">{Math.min(page * PAGE_SIZE, sorted.length)}</span> of <span className="text-white font-semibold">{sorted.length}</span> employees</>}
          </p>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035] flex items-center justify-center disabled:opacity-40"
            >
              <ChevronLeft size={13} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg ${page === p ? "bg-indigo-600" : "border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035]"}`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035] flex items-center justify-center disabled:opacity-40"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Employees;
