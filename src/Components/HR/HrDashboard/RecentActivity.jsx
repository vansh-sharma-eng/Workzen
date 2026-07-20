import React from "react";
import {
  CalendarCheck,
  UserPlus,
  Home,
  SquareCheckBig,
  Bell,
  ChevronRight,
} from "lucide-react";
import { useNotifications } from "../../../Utils/useNotifications";

const iconMap = {
  LEAVE: { icon: CalendarCheck, color: "#F59E0B" },
  WFH: { icon: Home, color: "#6366F1" },
  TASK: { icon: SquareCheckBig, color: "#22C55E" },
  EMPLOYEE_REQUEST: { icon: UserPlus, color: "#EC4899" },
};

const timeAgo = (iso) => {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const RecentActivity = () => {
  const { notifications, loading, markAllRead } = useNotifications();
  const recent = notifications.slice(0, 8);

  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md p-6 h-150 max-h-auto">
  
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-md font-semibold text-white">
            Recent HR Activity
          </h2>

          <p className="text-xs text-gray-400">
            Latest actions and updates
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllRead}
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs"
          >
            Mark all read
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[300px] text-slate-500 gap-2">
          <Bell size={20} className="opacity-50" />
          <p className="text-sm">No recent activity.</p>
        </div>
      ) : (
      <div className="space-y-5">
        {recent.map((activity) => {
          const { icon: Icon, color } = iconMap[activity.type] || { icon: Bell, color: "#6B7280" };

          return (
            <div
              key={activity.id}
              className="flex gap-4"
            >
            
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon size={17} style={{ color }} />
                </div>
              </div>

              <div className="flex-1 pb-2 border-b border-[#1A2035]">
                <h4 className={`font-medium text-sm leading-6 ${activity.read ? "text-gray-300" : "text-white"}`}>
                  {activity.title}
                </h4>

                <p className="text-gray-500 text-[13px]">
                  {activity.message}
                </p>

                <p className="text-gray-600 text-[11px] mt-0.5">
                  {timeAgo(activity.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default RecentActivity;
