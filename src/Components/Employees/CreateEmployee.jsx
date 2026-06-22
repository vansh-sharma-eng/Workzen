import { useContext, useState } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import { AuthContext } from "../Context/AuthProvider";

const DEPARTMENTS = [
  "Engineering", "Design", "Marketing", "Sales",
  "HR", "Finance", "Operations", "Backend", "Frontend",
  "Management", "Human Resources", "Product", "Analytics",
];

const ROLES = ["HR", "Employee"];

const inputClass =
  "w-full bg-[#0d0f14] border border-[#1e2333] rounded-xl py-2.5 px-4 text-sm text-[#f1f5f9] placeholder-[#3a4560] outline-none focus:border-[#3b82f6] transition-colors";

const labelClass =
  "block text-[10.5px] font-medium tracking-widest uppercase text-[#64748b] mb-1.5";

const CustomDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className={labelClass}>{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full bg-[#0d0f14] border rounded-md py-2 px-4 text-sm flex items-center justify-between outline-none transition-colors
          ${open ? "border-[#3b82f6]" : "border-[#1e2333]"}
          ${value ? "text-[#f1f5f9]" : "text-[#3a4560]"}`}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          size={15}
          className={`text-[#64748b] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%)] left-0 right-0 bg-[#151822] border border-[#1e2333] rounded-md z-50 shadow-2xl max-h-44 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-all
                ${value === opt
                  ? "text-[#60a5fa] bg-[#1e2333]"
                  : "text-[#94a3b8] hover:bg-[#1e2333] hover:text-[#f1f5f9]"
                }`}
            >
              <span>{opt}</span>
              {value === opt && <Check size={13} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateEmployee = ({ setOpenEmployeeForm }) => {
  const { userData, setUserData } = useContext(AuthContext);

  const [firstName, setFirstName]   = useState("");
  const [lastName, setLastName]     = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [phone, setPhone]           = useState("");
  const [title, setTitle]           = useState("");
  const [location, setLocation]     = useState("");
  const [role, setRole]             = useState("");
  const [department, setDepartment] = useState("");
  const [joinDate, setJoinDate]     = useState("");
  const [salary, setSalary]         = useState("");
 const [isActive, setIsActive] = useState(false);
const [probation, setProbation] = useState(false);
  const [error, setError]           = useState("");
  const [submitted, setSubmitted]   = useState(false);

  const clearError = () => setError("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !role || !department) {
      setError("Please fill in all required fields.");
      return;
    }

    const isDuplicate = userData.employeesData?.find((emp) => emp.email === email);
    if (isDuplicate) {
      setError("An employee with this email already exists.");
      return;
    }

    setError("");
    setSubmitted(true);

    const newEmployee = {
      id: joinDate ? new Date(joinDate).toISOString() : new Date().toISOString(),
      Name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      password: password || "workzen@123",
      phone,
      title,
      location,
      role: role.toLowerCase(),
      department,
      joinDate,
      salary: salary ? Number(salary) : 0,
      isActive,
      probation,
      leaveStatus: "",
      taskNumber: { total: 0, completed: 0, inProgress: 0, failed: 0 },
      tasks: [],
      leaveRequests: [],
    };

    const updated = [...(userData.employeesData || []), newEmployee];
    localStorage.setItem("employeeData", JSON.stringify(updated));
    setUserData({ ...userData, employeesData: updated });

    setTimeout(() => setOpenEmployeeForm(false), 900);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-4">
      <div className="w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-[#10111C] border border-[#1E2235] rounded-xl px-8 py-7 relative shadow-2xl">

        {/* Close */}
        <button
          onClick={() => setOpenEmployeeForm(false)}
          className="absolute top-4 right-5 text-[#64748b] hover:text-[#f1f5f9] transition-colors"
        >
          <X size={18} />
        </button>

        <h2 className="text-[#f1f5f9] text-xl font-semibold flex  justify-center">Add New Employee</h2>
        <p className="text-[#64748b] text-[10px] flex justify-center mb-6">Fill in the details to create a new employee account</p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="space-y-4">

            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>First Name <span className="text-rose-400">*</span></label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); clearError(); }}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Last Name <span className="text-rose-400">*</span></label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); clearError(); }}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className={labelClass}>Job Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Email + Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Email <span className="text-rose-400">*</span></label>
                <input
                  type="email"
                  placeholder="email@company.in"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  className={inputClass}
                  autoComplete="new-email"
                />
              </div>
              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  placeholder="Default: workzen@123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Phone + Location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  placeholder="City"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Role + Department */}
            <div className="grid grid-cols-2 gap-3">
              <CustomDropdown
                label="Role *"
                options={ROLES}
                value={role}
                onChange={(v) => { setRole(v); clearError(); }}
                placeholder="Select role"
              />
              <CustomDropdown
                label="Department *"
                options={DEPARTMENTS}
                value={department}
                onChange={(v) => { setDepartment(v); clearError(); }}
                placeholder="Select department"
              />
            </div>

            {/* Join Date + Salary */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Join Date</label>
                <input
                  type="date"
                  value={joinDate}
                  onChange={(e) => setJoinDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Salary (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 150000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-6 pt-1">
              {/* Active Status */}
              <div className="flex items-center gap-2">
               <button
  type="button"
  onClick={() => setIsActive(prev => !prev)}
  className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
    isActive ? "bg-green-700" : "bg-[#1e2333]"
  }`}
>
  <span
    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
      isActive ? "translate-x-5" : "translate-x-0"
    }`}
  />
</button>
                <span className="text-sm text-[#94a3b8]">Active</span>
              </div>

              {/* Probation */}
              <div className="flex items-center gap-2">
                <button
  type="button"
  onClick={() => setProbation(prev => !prev)}
  className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
    probation ? "bg-violet-500" : "bg-[#1e2333]"
  }`}
>
  <span
    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
      probation ? "translate-x-5" : "translate-x-0"
    }`}
  />
</button>
                <span className="text-sm text-[#94a3b8]">Probation</span>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-rose-400 text-xs mt-4 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setOpenEmployeeForm(false)}
              className="flex-1 py-2.5 rounded-xl text-sm border border-[#1e2333] text-[#94a3b8] hover:bg-[#1e2333] transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitted}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-all
                ${submitted ? "bg-emerald-500 cursor-default" : "bg-[#3b82f6] hover:bg-[#2563eb]"}`}
            >
              {submitted ? "Employee Added!" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;