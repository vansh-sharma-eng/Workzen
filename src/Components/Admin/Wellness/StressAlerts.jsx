// src/Components/Wellness/StressAlerts.jsx

import { TriangleAlert } from "lucide-react";

const alerts = [
  {
    initials: "SI",
    name: "Sneha Iyer",
    dept: "Design",
    desc: "3 consecutive stressed days · Auto HR alert triggered",
  },
  {
    initials: "DK",
    name: "Dev Khatri",
    dept: "Engineering",
    desc: "2 consecutive stressed days · Work hours > 10h/day",
  },
];

const StressAlerts = ({sidebarCollapsed} ) => {
  return (
    <div
    className={`
      transition-all duration-300
      ${
        sidebarCollapsed
          ? "ml-0 w-[calc(100%-3rem)]"
          : "ml-0 w-[calc(100%-2.5rem)]"
      }`}>
    <div className=" border border-[#1E2235] bg-[#10111C] rounded-md mb-5 p-4">
      <div className="flex items-center gap-2 mb-5">
        <TriangleAlert
          className="text-red-500"
          size={14}
        />

        <h2 className="text-white text-md font-bold">
          Stress Alerts
        </h2>

        <span className="bg-red-950 text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
          2 employees
        </span>
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.name}
            className="border border-red-950 bg-[#21131639] rounded-md py-2 px-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3A0D1F] flex items-center justify-center text-red-400 font-semibold text-sm">
                {alert.initials}
              </div>

              <div>
                <h3 className="text-white text-md font-semibold">
                  {alert.name}
                  <span className="text-gray-400 font-normal text-xs">
                    {" "}
                    · {alert.dept}
                  </span>
                </h3>

                <p className="text-gray-400 text-xs">
                  {alert.desc}
                </p>
              </div>
            </div>

            <button className="border border-[#2E354D] rounded-xl px-2 text-xs py-2 text-white hover:bg-[#1A2033] transition">
              Schedule 1:1
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default StressAlerts;