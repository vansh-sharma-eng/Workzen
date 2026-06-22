import { useContext, useState } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import { AuthContext } from "../../Context/AuthProvider";

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
];

const ROLES = ["HR", "Employee"];

const inputClass =
  "w-full bg-[#0d0f14] border border-[#1e2333] rounded-xl py-2.5 px-4 text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none focus:border-[#3b82f6] transition-colors";

const labelClass =
  "block text-[11px] font-medium uppercase tracking-wider text-[#94a3b8] mb-2";

const CustomDropdown = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className={labelClass}>{label}</label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition
        ${
          open
            ? "border-blue-500"
            : "border-[#1e2333]"
        }
        bg-[#0d0f14]`}
      >
        <span
          className={
            value ? "text-white" : "text-[#64748b]"
          }
        >
          {value || placeholder}
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#151822] border border-[#1e2333] rounded-xl overflow-hidden shadow-2xl">
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

              {value === item && (
                <Check
                  size={15}
                  className="text-blue-400"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateEmployee = ({
  setOpenEmployeeForm,
}) => {
  const { userData, setUserData } =
    useContext(AuthContext);

  const [firstName, setFirstName] =
    useState("");
  const [lastName, setLastName] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [phone, setPhone] =
    useState("");
  const [title, setTitle] =
    useState("");
  const [location, setLocation] =
    useState("");
  const [role, setRole] =
    useState("");
  const [department, setDepartment] =
    useState("");
  const [joinDate, setJoinDate] =
    useState("");
  const [salary, setSalary] =
    useState("");

  const [isActive, setIsActive] =
    useState(true);
  const [probation, setProbation] =
    useState(false);

  const [error, setError] =
    useState("");
  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !role ||
      !department
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    const exists =
      userData?.employeesData?.find(
        (emp) =>
          emp.email.toLowerCase() ===
          email.toLowerCase()
      );

    if (exists) {
      setError(
        "Employee with this email already exists."
      );
      return;
    }

    const newEmployee = {
      id: Date.now(),
      Name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      password:
        password || "workzen@123",
      phone,
      title,
      location,
      role: role.toLowerCase(),
      department,
      joinDate,
      salary: Number(salary) || 0,
      isActive,
      probation,

      leaveStatus: "",

      taskNumber: {
        total: 0,
        completed: 0,
        inProgress: 0,
        failed: 0,
      },

      tasks: [],
      leaveRequests: [],
    };

    const updatedEmployees = [
      ...(userData?.employeesData || []),
      newEmployee,
    ];

    localStorage.setItem(
      "employeeData",
      JSON.stringify(updatedEmployees)
    );

    setUserData({
      ...userData,
      employeesData: updatedEmployees,
    });

    setSubmitted(true);

    setTimeout(() => {
      setOpenEmployeeForm(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#10111C] border border-[#1E2235] rounded-2xl p-8 relative">

        <button
          onClick={() =>
            setOpenEmployeeForm(false)
          }
          className="absolute right-5 top-5 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Add New Employee
        </h2>

        <p className="text-gray-400 mb-8">
          Create a new employee account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                First Name *
              </label>
              <input
                className={inputClass}
                value={firstName}
                onChange={(e) =>
                  setFirstName(
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className={labelClass}>
                Last Name *
              </label>
              <input
                className={inputClass}
                value={lastName}
                onChange={(e) =>
                  setLastName(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Email *
              </label>
              <input
                type="email"
                className={inputClass}
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className={labelClass}>
                Password
              </label>
              <input
                type="password"
                className={inputClass}
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <CustomDropdown
              label="Role *"
              options={ROLES}
              value={role}
              onChange={setRole}
              placeholder="Select Role"
            />

            <CustomDropdown
              label="Department *"
              options={DEPARTMENTS}
              value={department}
              onChange={setDepartment}
              placeholder="Select Department"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Phone
              </label>
              <input
                className={inputClass}
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className={labelClass}>
                Location
              </label>
              <input
                className={inputClass}
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Job Title
              </label>
              <input
                className={inputClass}
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className={labelClass}>
                Salary
              </label>
              <input
                type="number"
                className={inputClass}
                value={salary}
                onChange={(e) =>
                  setSalary(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Join Date
            </label>

            <input
              type="date"
              className={inputClass}
              value={joinDate}
              onChange={(e) =>
                setJoinDate(
                  e.target.value
                )
              }
            />
          </div>

          <div className="flex gap-8">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() =>
                  setIsActive(
                    !isActive
                  )
                }
              />
              Active Employee
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={probation}
                onChange={() =>
                  setProbation(
                    !probation
                  )
                }
              />
              Probation
            </label>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() =>
                setOpenEmployeeForm(false)
              }
              className="flex-1 py-3 rounded-xl border border-[#1e2333]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitted}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
            >
              {submitted
                ? "Employee Added"
                : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;