import React from "react";
import {
  CheckCircle2,
  Clock3,
  Wifi,
  XCircle,
} from "lucide-react";

const ICONS_BY_ID = {
  present: CheckCircle2,
  late: Clock3,
  wfh: Wifi,
  absent: XCircle,
};

const AttendanceStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((item) => {
        const Icon = ICONS_BY_ID[item.id] || CheckCircle2;

        return (
          <div
            key={item.id}
            className="bg-[#10111C] border border-[#1E2235] rounded-md p-3"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-md flex items-center justify-center ${item.bg}`}
              >
                <Icon size={17} className={item.color} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-white text-xl font-bold">
                    {item.value}
                  </h2>

                  <span className={`${item.color} text-xs font-medium`}>
                    {item.percentage}
                  </span>
                </div>

                <p className="text-[#94a3b8] text-xs">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceStats;