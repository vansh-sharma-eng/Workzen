// CreateEmployee.jsx
import { useContext, useState } from "react";
import { X, User, Mail, Lock, Briefcase, ChevronDown, Check } from "lucide-react";
import { AuthContext } from "../Context/AuthProvider";

const CreateEmployee = ({ setOpenEmployeeForm }) => {
  const { userData, setUserData } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("employee");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const departments = [
    "Engineering", "Design", "Marketing", "Sales",
    "HR", "Finance", "Operations", "Backend", "Frontend", "Management",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !department) {
      setError("Please fill in all fields.");
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
      id: Date.now(),
      Name: `${firstName} ${lastName}`,
      firstName, lastName, email, password, department, role,
      taskNumber: { total: 0, completed: 0, inProgress: 0, failed: 0 },
      tasks: [],
    };

    const updatedEmployees = [...(userData.employeesData || []), newEmployee];
    localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));
    setUserData({ ...userData, employeesData: updatedEmployees });

    setTimeout(() => {
      setFirstName(""); setLastName(""); setEmail("");
      setPassword(""); setDepartment(""); setRole("employee");
      setSubmitted(false); setOpenEmployeeForm(false);
    }, 1200);
  };

  const inputClass =
    "w-full bg-[#0d0f14] border border-[#1e2333] rounded-lg py-2.5 pl-9 pr-3.5 text-sm text-[#f1f5f9] placeholder-[#2a3244] outline-none focus:border-[#3b82f6] transition-colors";

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-6">
      <div className="w-[460px] bg-[#151822] border border-[#1e2333] rounded-2xl px-8 py-7 relative">
        <button
          onClick={() => setOpenEmployeeForm(false)}
          className="absolute top-4 right-4 text-[#64748b] hover:text-[#f1f5f9] transition-all"
        >
          <X size={18} />
        </button>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-7 rounded-lg bg-[#3b82f6] flex items-center justify-center font-bold text-xs text-white">
              W
            </div>
            <span className="text-[#f1f5f9] text-sm font-semibold">
              Work<span className="text-[#60a5fa]">Zen</span>
            </span>
          </div>

          <h2 className="text-lg font-semibold text-[#f1f5f9] mb-1">
            Add new{" "}
            <span className="text-[#60a5fa] font-normal italic">employee</span>
          </h2>
          <p className="text-[11px] text-[#64748b] mb-5">
            Fill in the details to onboard a new team member.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
                First name
              </label>
              <div className="relative">
                <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a3244]" />
                <input
                  type="text"
                  placeholder="First name"
                  autoComplete="off"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setError(""); }}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
                Last name
              </label>
              <div className="relative">
                <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a3244]" />
                <input
                  type="text"
                  placeholder="Last name"
                  autoComplete="off"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setError(""); }}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
                Email address
              </label>
              <div className="relative">
                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a3244]" />
                <input
                  type="email"
                  placeholder="email@company.com"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
                Password
              </label>
              <div className="relative">
                <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a3244]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4 relative">
            <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
              Department
            </label>
            <div className="relative">
              <Briefcase
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a3244] pointer-events-none"
              />
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full bg-[#0d0f14] border rounded-lg py-2.5 pl-9 pr-3.5 text-sm text-left flex items-center justify-between outline-none transition-colors
                  ${dropdownOpen ? "border-[#3b82f6]" : "border-[#1e2333]"}
                  ${department ? "text-[#f1f5f9]" : "text-[#2a3244]"}`}
              >
                <span>{department || "Select department"}</span>
                <ChevronDown
                  size={13}
                  className={`text-[#64748b] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[#151822] border border-[#1e2333] rounded-xl z-50 shadow-xl h-20 overflow-y-auto">
                  {departments.map((dept) => (
                    <div
                      key={dept}
                      onClick={() => { setDepartment(dept); setDropdownOpen(false); setError(""); }}
                      className={`flex items-center justify-between px-4 py-2.5 text-xs cursor-pointer transition-all
                        ${department === dept
                          ? "text-[#60a5fa] bg-[#1e2333]"
                          : "text-[#64748b] hover:bg-[#1e2333] hover:text-[#f1f5f9]"
                        }`}
                    >
                      <span>{dept}</span>
                      {department === dept && <Check size={12} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs mb-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitted}
            className={`w-full py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all
              ${submitted
                ? "bg-[#3b82f6] opacity-80"
                : "bg-[#3b82f6] hover:bg-[#60a5fa]"
              }`}
          >
            {submitted ? (
              <><Check size={15} /><span>Employee added!</span></>
            ) : (
              <span>Add employee</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;