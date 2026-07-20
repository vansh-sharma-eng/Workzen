import { useContext, useState } from "react";
import { X, ChevronDown, Check, Loader2 } from "lucide-react";
import { AuthContext } from "../../Context/AuthProvider";
import { employeeApi } from "../../../api";

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Backend",
  "Frontend",
  "Management",
  "Product",
  "Analytics",
  "Customer Support",
];

const ROLES = ["HR", "Employee"];

const inputClass =
  "w-full bg-[#0d0f14] border border-[#1e2333] rounded-xl py-2.5 px-4 text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#3b82f6] transition-colors";

const labelClass =
  "block text-[11px] font-medium uppercase tracking-wider text-[#94a3b8] mb-2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CustomDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className={labelClass}>{label}</label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition
        ${open ? "border-blue-500" : "border-[#1e2333]"}
        bg-[#0d0f14]`}
      >
        <span className={value ? "text-white" : "text-[#64748b]"}>
          {value || placeholder}
        </span>

        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#151822] border border-[#1e2333] rounded-xl overflow-hidden shadow-2xl max-h-56 overflow-y-auto">
          {options.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#1e2333] text-sm"
            >
              <span>{item}</span>
              {value === item && <Check size={15} className="text-blue-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateEmployee = ({ setOpenEmployeeForm }) => {
  const { userData, refreshData } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [managerId, setManagerId] = useState("");

  const hrOptions = userData?.hrData || [];

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirst || !trimmedLast || !trimmedEmail || !role || !department) {
      setError("Please fill all required fields.");
      return;
    }

    if (!EMAIL_RE.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password && password.length < 6) {
      setError("Password must be at least 6 characters — or leave it blank to use the default.");
      return;
    }

    if (salary && (isNaN(Number(salary)) || Number(salary) < 0)) {
      setError("Salary must be a valid positive number.");
      return;
    }

    const exists = userData?.employeesData?.find(
      (emp) => emp.email.toLowerCase() === trimmedEmail.toLowerCase()
    );

    if (exists) {
      setError("Employee with this email already exists.");
      return;
    }

    // Backend Role enum is ADMIN | HR | EMPLOYEE.
    const backendRole = ["admin", "hr"].includes(role.toLowerCase())
      ? role.toUpperCase()
      : "EMPLOYEE";

    setIsSubmitting(true);
    try {
      await employeeApi.create({
        name: `${trimmedFirst} ${trimmedLast}`,
        email: trimmedEmail,
        password: password || "workzen@123",
        role: backendRole,
        department,
        position: title.trim(),
        salary: salary ? Number(salary) : null,
        managerId: managerId ? Number(managerId) : null,
      });

      await refreshData();
      setSubmitted(true);

      setTimeout(() => {
        setOpenEmployeeForm(false);
      }, 900);
    } catch (err) {
      setError(err.message || "Couldn't create this employee. Please check the details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-4 sm:my-0 max-h-[92vh] overflow-y-auto bg-[#10111C] border border-[#1E2235] rounded-2xl p-5 sm:p-8 relative">
        <button
          onClick={() => setOpenEmployeeForm(false)}
          className="absolute right-4 top-4 sm:right-5 sm:top-5 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 pr-8">Add New Employee</h2>
        <p className="text-gray-400 mb-6 sm:mb-8 text-sm">
          Create a new employee account. They can sign in immediately with the password below (or the default).
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name *</label>
              <input className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>Last Name *</label>
              <input className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Default: workzen@123"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <CustomDropdown label="Role *" options={ROLES} value={role} onChange={setRole} placeholder="Select Role" />
            <CustomDropdown
              label="Department *"
              options={DEPARTMENTS}
              value={department}
              onChange={setDepartment}
              placeholder="Select Department"
            />
          </div>

          <div>
            <label className={labelClass}>Job Title</label>
            <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Salary (Monthly) — Admin only</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={inputClass}
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. 55000"
              />
            </div>

            <CustomDropdown
              label="Assign to HR / Team"
              options={hrOptions.map((h) => h.name)}
              value={hrOptions.find((h) => String(h.id) === String(managerId))?.name || ""}
              onChange={(name) => {
                const match = hrOptions.find((h) => h.name === name);
                setManagerId(match ? match.id : "");
              }}
              placeholder={hrOptions.length ? "Select HR / Team" : "No HR users yet"}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-2 sticky bottom-0 bg-[#10111C] pb-1">
            <button
              type="button"
              onClick={() => setOpenEmployeeForm(false)}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl border border-[#1e2333] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {submitted ? "Employee Added" : isSubmitting ? "Adding…" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
