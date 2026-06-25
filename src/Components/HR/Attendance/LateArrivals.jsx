import React from "react";
import { Clock3, AlertTriangle } from "lucide-react";

const lateEmployees = [
  {
    id: 1,
    name: "Aria Thompson",
    initials: "AT",
    avatarColor: "#6366F1",
    checkIn: "09:34 AM",
    delay: "34 mins",
  },
  {
    id: 2,
    name: "John Smith",
    initials: "JS",
    avatarColor: "#F97316",
    checkIn: "09:26 AM",
    delay: "26 mins",
  },
  {
    id: 3,
    name: "Fatima Noor",
    initials: "FN",
    avatarColor: "#EC4899",
    checkIn: "09:18 AM",
    delay: "18 mins",
  },
];

const LateArrivals = () => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-xl overflow-hidden">
      
      <div className="flex items-center justify-between px-5 py-2 border-b border-[#1A2035]">
        <div>
          <h2 className="text-md font-semibold text-white">
            Late Arrivals Today
          </h2>

          <p className="text-xs text-gray-400">
            Employees who checked in after 9:00 AM
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-yellow-500/15 text-yellow-400 px-3 py-1.5 rounded-lg text-xs font-medium">
          <AlertTriangle size={12} />
          {lateEmployees.length} Late
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-[#1A2035]">
        {lateEmployees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between px-6 py-3 hover:bg-[#171A27] transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-9 h-9 text-xs rounded-full flex items-center justify-center text-white font-semibold"
                style={{
                  backgroundColor: employee.avatarColor,
                }}
              >
                {employee.initials}
              </div>

              <div>
                <h3 className="text-white font-medium text-md">
                  {employee.name}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <Clock3 size={11} />
                  Checked in at {employee.checkIn}
                </div>
              </div>
            </div>

            <span className="px-2 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-semibold">
              {employee.delay} Late
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LateArrivals;