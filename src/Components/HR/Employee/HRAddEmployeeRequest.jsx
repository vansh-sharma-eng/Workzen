import { useState } from "react";
import { X, ChevronDown, Check, Loader2 } from "lucide-react";
import { employeeRequestApi } from "../../../api";

const DEPARTMENTS = [
  "Engineering", "Design", "Marketing", "Sales", "HR", "Finance",
  "Operations", "Backend", "Frontend", "Management", "Product", "Analytics", "Customer Support",
];

const inputClass =
  "w-full bg-[#0d0f14] border border-[#1e2333] rounded-xl py-2.5 px-4 text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#6366f1] transition-colors";

const labelClass =
  "block text-[11px] font-medium uppercase tracking-wider text-[#94a3b8] mb-2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DeptDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className={labelClass}>Department *</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition
        ${open ? "border-indigo-500" : "border-[#1e2333]"} bg-[#0d0f14]`}
      >
        <span className={value ? "text-white" : "text-[#64748b]"}>{value || "Select Department"}</span>
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#151822] border border-[#1e2333] rounded-xl overflow-hidden shadow-2xl max-h-56 overflow-y-auto">
          {DEPARTMENTS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => { onChange(item); setOpen(false); }}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#1e2333] text-sm"
            >
              <span>{item}</span>
              {value === item && <Check size={15} className="text-indigo-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * HR-facing "Add Employee" form. Deliberately has NO salary field and NO role picker —
 * this only submits a request; an admin reviews it (and sets the starting salary) in
 * the Admin > Employees > HR Requests panel before the account actually exists.
 */
const HRAddEmployeeRequest = ({ onClose, onSubmitted }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirst || !trimmedLast || !trimmedEmail || !department) {
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

    setIsSubmitting(true);
    try {
      await employeeRequestApi.submit({
        name: `${trimmedFirst} ${trimmedLast}`,
        email: trimmedEmail,
        password: password || "workzen@123",
        department,
        position: title.trim(),
      });
      setSubmitted(true);
      onSubmitted?.();
      setTimeout(() => onClose(), 1100);
    } catch (err) {
      setError(err.message || "Couldn't submit this request. Please check the details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-4 sm:my-0 max-h-[92vh] overflow-y-auto bg-[#13141F] border border-[#1A2035] rounded-2xl p-5 sm:p-8 relative">
        <button onClick={onClose} className="absolute right-4 top-4 sm:right-5 sm:top-5 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 pr-8">Add New Employee</h2>
        <p className="text-gray-400 mb-6 sm:mb-8 text-sm">
          This sends a request to Admin to add this person to your team. They'll be created once approved
          — salary is set by Admin, not here.
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
            <DeptDropdown value={department} onChange={setDepartment} />
            <div>
              <label className={labelClass}>Job Title</label>
              <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-2 sticky bottom-0 bg-[#13141F] pb-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl border border-[#1e2333] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {submitted ? "Request Sent" : isSubmitting ? "Sending…" : "Send Request to Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HRAddEmployeeRequest;
