import { useContext, useRef, useState, useEffect } from "react";
import {
  Plus, Search, ChevronDown, Check, MoreVertical,
  Pencil, Trash2, X, Mail, Phone, ChevronLeft, ChevronRight,
} from "lucide-react";
import { AuthContext } from "../../Components/Context/AuthProvider";
import CreateEmployee from "../../Components/Employees/CreateEmployee";

// ─── Constants ────────────────────────────────────────────────────────────────
const DEPARTMENTS = [
  "Engineering", "Design", "Marketing", "Sales", "Finance",
  "Operations", "Human Resources", "Product", "Analytics", "HR",
  "Backend", "Frontend", "Management",
];

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
};

const PAGE_SIZE = 8;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getInitials = (f, l) =>
  `${f?.charAt(0) || ""}${l?.charAt(0) || ""}`.toUpperCase() || "?";

const formatJoinDate = (id) => {
  if (!id) return "—";
  const d = new Date(id);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};

const formatSalary = (n) =>
  n ? "₹" + Number(n).toLocaleString("en-IN") : "—";

const getStatus = (emp) => {
  if (emp.probation)               return "probation";
  if (emp.leaveStatus === "approved") return "leave";
  return "active";
};

// ─── StatusBadge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ emp }) => {
  const s = getStatus(emp);
  const styles = {
    active:    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    leave:     "bg-amber-500/10  text-amber-400  border border-amber-500/20",
    probation: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  };
  const labels = { active: "Active", leave: "On Leave", probation: "Probation" };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${styles[s]}`}>
      {labels[s]}
    </span>
  );
};

// ─── FilterDropdown ───────────────────────────────────────────────────────────
const FilterDropdown = ({ label, options, value, onChange }) => {
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
        <span>{value || label}</span>
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 bg-[#151822] border border-[#1e2333] rounded-xl z-50 shadow-2xl min-w-[180px] py-1 overflow-hidden">
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
              <span>{opt}</span>
              {value === opt && <Check size={13} className="text-[#3b82f6]" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── ActionsMenu ──────────────────────────────────────────────────────────────
const ActionsMenu = ({ employee, onEdit, onDelete }) => {
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
        <div className="absolute right-0 top-[calc(100%+4px)] bg-[#151822] border border-[#1e2333] rounded-xl z-50 shadow-2xl w-36 py-1 overflow-hidden">
          <button
            onClick={() => { onEdit(employee); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#94a3b8] hover:bg-[#1e2333] hover:text-[#f1f5f9] transition-all"
          >
            <Pencil size={13} /> Edit
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

// ─── EditModal ────────────────────────────────────────────────────────────────
const EditModal = ({ employee, onClose, onSave }) => {
  const [form, setForm] = useState({
    firstName:  employee.firstName  || "",
    lastName:   employee.lastName   || "",
    title:      employee.title      || "",
    email:      employee.email      || "",
    phone:      employee.phone      || "",
    location:   employee.location   || "",
    salary:     employee.salary     || "",
    role:       employee.role       || "employee",
    department: employee.department || "",
    probation:  employee.probation  || false,
    leaveStatus: employee.leaveStatus || "",
  });
  const [deptOpen, setDeptOpen] = useState(false);

  const inp = "w-full bg-[#0d0f14] border border-[#1e2333] rounded-xl py-2.5 px-4 text-sm text-[#f1f5f9] placeholder-[#2a3244] outline-none focus:border-[#3b82f6] transition-colors";
  const lbl = "text-[10.5px] font-medium tracking-widest uppercase text-[#64748b] block mb-1.5";
  const set  = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-6">
      <div className="w-[540px] max-h-[100vh] overflow-y-auto bg-[#151822] border border-[#1e2333] rounded-2xl px-8 py-7 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#64748b] hover:text-[#f1f5f9] transition-colors">
          <X size={18} />
        </button>

        <h2 className="text-[#f1f5f9] text-lg font-semibold mb-1">Edit Employee</h2>
        <p className="text-[#64748b] text-xs mb-6">Update employee information</p>

        <div className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>First Name</label>
              <input className={inp} value={form.firstName} onChange={set("firstName")} placeholder="First name" />
            </div>
            <div>
              <label className={lbl}>Last Name</label>
              <input className={inp} value={form.lastName} onChange={set("lastName")} placeholder="Last name" />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={lbl}>Job Title</label>
            <input className={inp} value={form.title} onChange={set("title")} placeholder="e.g. Senior Software Engineer" />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Email</label>
              <input className={inp} value={form.email} onChange={set("email")} placeholder="email@company.in" />
            </div>
            <div>
              <label className={lbl}>Phone</label>
              <input className={inp} value={form.phone} onChange={set("phone")} placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>

          {/* Location + Salary */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Location</label>
              <input className={inp} value={form.location} onChange={set("location")} placeholder="City" />
            </div>
            <div>
              <label className={lbl}>Salary (₹)</label>
              <input type="number" className={inp} value={form.salary} onChange={set("salary")} placeholder="e.g. 150000" />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className={lbl}>Role</label>
            <select className={inp} value={form.role} onChange={set("role")}>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
          </div>

          {/* Department */}
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

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-1">
            {/* Active / On Leave */}
            <div className="flex items-center gap-2.5">
              <button
  type="button"
  onClick={() =>
    setForm((f) => ({
      ...f,
      leaveStatus: f.leaveStatus === "approved" ? "" : "approved",
    }))
  }
  className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
    form.leaveStatus === "approved"
      ? "bg-amber-500"
      : "bg-[#1e2333]"
  }`}
>
  <span
    className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
      form.leaveStatus === "approved"
        ? "translate-x-5"
        : "translate-x-0"
    }`}
  />
</button>
              <span className="text-sm text-[#94a3b8]">On Leave</span>
            </div>

            {/* Probation */}
            <div className="flex items-center gap-2.5">
             <button
  type="button"
  onClick={() =>
    setForm((f) => ({
      ...f,
      probation: !f.probation,
    }))
  }
  className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
    form.probation
      ? "bg-violet-500"
      : "bg-[#1e2333]"
  }`}
>
  <span
    className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
      form.probation
        ? "translate-x-5"
        : "translate-x-0"
    }`}
  />
</button>
              <span className="text-sm text-[#94a3b8]">Probation</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm border border-[#1e2333] text-[#94a3b8] hover:bg-[#1e2333] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({ ...employee, ...form, Name: `${form.firstName} ${form.lastName}` })
            }
            className="flex-1 py-2.5 rounded-xl text-sm bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── DeleteModal ──────────────────────────────────────────────────────────────
const DeleteModal = ({ employee, onClose, onConfirm }) => (
  <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-6">
    <div className="w-[400px] bg-[#151822] border border-[#1e2333] rounded-2xl px-8 py-7">
      <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
        <Trash2 size={20} className="text-rose-400" />
      </div>
      <h2 className="text-[#f1f5f9] text-lg font-semibold mb-1">Delete Employee</h2>
      <p className="text-[#64748b] text-sm mb-6">
        Are you sure you want to delete{" "}
        <span className="text-[#f1f5f9] font-medium">
          {employee.firstName} {employee.lastName}
        </span>
        ? This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl text-sm border border-[#1e2333] text-[#94a3b8] hover:bg-[#1e2333] transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl text-sm bg-rose-500 text-white hover:bg-rose-600 transition-all font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const AdminEmployeesPage = ({sidebarCollapsed}) => {
  const { userData, setUserData, refreshData } = useContext(AuthContext);

  const [search,       setSearch]       = useState("");
  const [deptFilter,   setDeptFilter]   = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page,         setPage]         = useState(1);
  const [showAdd,      setShowAdd]      = useState(false);
  const [editEmp,      setEditEmp]      = useState(null);
  const [deleteEmp,    setDeleteEmp]    = useState(null);

  useEffect(() => { refreshData(); }, []);
  useEffect(() => { setPage(1); }, [search, deptFilter, statusFilter]);

  const employees   = userData.employeesData || [];
  const uniqueDepts = [...new Set(employees.map((e) => e.department).filter(Boolean))];

  // ── filtering ──
  const filtered = employees.filter((emp) => {
    const fullName    = `${emp.firstName || ""} ${emp.lastName || ""}`.toLowerCase();
    const matchSearch = fullName.includes(search.toLowerCase()) ||
                        emp.email?.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !deptFilter   || emp.department === deptFilter;
    const matchStatus = !statusFilter || getStatus(emp) === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── stats ──
  const stats = {
    total:     employees.length,
    active:    employees.filter((e) => getStatus(e) === "active").length,
    leave:     employees.filter((e) => getStatus(e) === "leave").length,
    probation: employees.filter((e) => getStatus(e) === "probation").length,
  };

  // ── handlers ──
  const persist = (list) => {
    localStorage.setItem("employeeData", JSON.stringify(list));
    setUserData({ ...userData, employeesData: list });
  };

  const handleEdit = (updated) => {
    persist(employees.map((e) => (e.id === updated.id ? updated : e)));
    setEditEmp(null);
  };

  const handleDelete = () => {
    persist(employees.filter((e) => e.id !== deleteEmp.id));
    setDeleteEmp(null);
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
          onClose={() => setEditEmp(null)}
          onSave={handleEdit}
        />
      )}
      {deleteEmp && (
        <DeleteModal
          employee={deleteEmp}
          onClose={() => setDeleteEmp(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search employees..."
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
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* ── Stats bar ── */}
      <div className="flex items-center gap-5 mb-5 flex-wrap">
        {[
          { label: "Total",     value: stats.total,     dot: "bg-blue-400"    },
          { label: "Active",    value: stats.active,    dot: "bg-emerald-400" },
          { label: "On Leave",  value: stats.leave,     dot: "bg-amber-400"   },
          { label: "Probation", value: stats.probation, dot: "bg-violet-400"  },
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
            options={["active", "leave", "probation"]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-[#151822] border border-[#1e2333] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2333]">
                {["Employee", "Department", "Contact", "Location", "Joined", "Salary", "Status", ""].map((col) => (
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
                  <td colSpan={8} className="px-6 py-16 text-center text-[#64748b] text-sm">
                    {employees.length === 0
                      ? "No employees yet. Add your first employee!"
                      : "No employees match your search."}
                  </td>
                </tr>
              ) : (
                pageData.map((emp, i) => {
                  const colorIdx = (i + (page - 1) * PAGE_SIZE) % AVATAR_COLORS.length;
                  return (
                    <tr
                      key={emp.id}
                      className="border-b border-[#1e2333] last:border-0 hover:bg-[#1a1f2e] transition-colors"
                    >
                      {/* Employee */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${AVATAR_COLORS[colorIdx]}`}>
                            {getInitials(emp.firstName, emp.lastName)}
                          </div>
                          <div>
                            <p className="text-[#f1f5f9] text-sm font-medium whitespace-nowrap">
                              {emp.firstName} {emp.lastName}
                            </p>
                            <p className="text-[#64748b] text-xs whitespace-nowrap">
                              {emp.title || "—"}
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

                      {/* Contact */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                            <Mail size={11} className="text-[#64748b] shrink-0" />
                            <span className="whitespace-nowrap">{emp.email || "—"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                            <Phone size={11} className="text-[#64748b] shrink-0" />
                            <span className="whitespace-nowrap">{emp.phone || "—"}</span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4 text-[#94a3b8] text-sm whitespace-nowrap">
                        {emp.location || "—"}
                      </td>

                      {/* Joined */}
                      <td className="px-5 py-4 text-[#94a3b8] text-sm whitespace-nowrap">
                        {formatJoinDate(emp.id)}
                      </td>

                      {/* Salary */}
                      <td className="px-5 py-4 text-[#f1f5f9] text-sm font-semibold whitespace-nowrap">
                        {formatSalary(emp.salary)}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge emp={emp} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <ActionsMenu
                          employee={emp}
                          onEdit={setEditEmp}
                          onDelete={setDeleteEmp}
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