import {
  Monitor,
  Video,
  Coffee,
} from "lucide-react";

const employees = [
  {
    name: "Priya Mehta",
    role: "Sr. Engineer",
    initials: "PM",
    status: "Working",
  },
  {
    name: "Rahul Gupta",
    role: "Product Manager",
    initials: "RG",
    status: "In Meeting",
  },
  {
    name: "Sneha Iyer",
    role: "UX Designer",
    initials: "SI",
    status: "On Break",
  },
  {
    name: "Vikram Patel",
    role: "Sales Lead",
    initials: "VP",
    status: "WFH",
  },
  {
    name: "Ananya Roy",
    role: "HR Manager",
    initials: "AR",
    status: "Working",
  },
  {
    name: "Dev Khatri",
    role: "DevOps Eng.",
    initials: "DK",
    status: "Working",
  },
  {
    name: "Meera Nair",
    role: "Data Analyst",
    initials: "MN",
    status: "In Meeting",
  },
  {
    name: "Saurabh Jain",
    role: "Finance Mgr.",
    initials: "SJ",
    status: "Working",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Working":
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
      };

    case "In Meeting":
      return {
        bg: "bg-indigo-100",
        text: "text-indigo-700",
        dot: "bg-indigo-500",
      };

    case "On Break":
      return {
        bg: "bg-amber-100",
        text: "text-amber-700",
        dot: "bg-amber-500",
      };

    case "WFH":
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        dot: "bg-blue-500",
      };

    default:
      return {
        bg: "bg-slate-100",
        text: "text-slate-700",
        dot: "bg-slate-500",
      };
  }
};

export default function LiveEmployeeStatus() {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-white text-md font-semibold">
            Live Employee Status
          </h2>

          <p className="text-[#94A3B8]  text-[13px] mt-1">
            Real-time activity tracker
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-[#111827] border border-[#1A2035]">
            <Monitor
              size={10}
              className="text-[#94A3B8]"
            />
            <span className=" text-xs text-white ">
              98
            </span>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-[#111827] border border-[#1A2035]">
            <Video
              size={10}
              className="text-[#94A3B8]"
            />
            <span className="text-xs text-white  ">
              22
            </span>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-[#111827] border border-[#1A2035]">
            <Coffee
              size={10  }
              className="text-[#94A3B8]"
            />
            <span className="text-xs text-white ">
              12
            </span>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {employees.map((employee) => {
          const status =
            getStatusStyle(employee.status);

          return (
            <div
              key={employee.name}
              className="flex items-center justify-between p-2 rounded-mdn border border-[#1A2035] bg-[#0F1529] hover:border-[#2A3350] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                
                <div className="w-8 h-8 rounded-full bg-[#161D42] flex items-center justify-center">
                  <span className="text-[#6366F1] font-semibold text-xs">
                    {employee.initials}
                  </span>
                </div>

                <div>
                  <h5 className="text-white font-semibold text-sm">
                    {employee.name}
                  </h5>

                  <p className="text-[#94A3B8] text-xs">
                    {employee.role}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div
                className={`flex items-center gap-2 px-2 py-1 rounded-full ${status.bg}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${status.dot}`}
                />

                <span
                  className={`text-[10px] font-medium ${status.text}`}
                >
                  {employee.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}