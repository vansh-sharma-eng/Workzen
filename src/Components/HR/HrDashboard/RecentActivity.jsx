import React from "react";
import {
  CalendarCheck,
  UserPlus,
  FileText,
  Target,
  BadgeIndianRupee,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { recentActivities } from "../../../data/HrData/HrdashboardData";
const iconMap = {
  leave: CalendarCheck,
  employee: UserPlus,
  document: FileText,
  goal: Target,
  payroll: BadgeIndianRupee,
  policy: ClipboardList,
};

const RecentActivity = () => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md p-6 h-150 max-h-auto">
  
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-md font-semibold text-white">
            Recent HR Activity
          </h2>

          <p className="text-xs text-gray-400">
            Latest actions performed by HR
          </p>
        </div>

        <button className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs">
          View All
          <ChevronRight size={14} />
        </button>
      </div>


      <div className="space-y-5">
        {recentActivities.map((activity) => {
          const Icon = iconMap[activity.type] || ClipboardList;

          return (
            <div
              key={activity.id}
              className="flex gap-4"
            >
            
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${activity.color}20`,
                  }}
                >
                  <Icon
                    size={17}
                    style={{
                      color: activity.color,
                    }}
                  />
                </div>

 
</div>


              <div className="flex-1 pb-2 border-b border-[#1A2035]">
                <h4 className="text-white font-medium text-sm leading-6">
                  {activity.title}
                </h4>

                <p className="text-gray-500 text-[13px]">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;