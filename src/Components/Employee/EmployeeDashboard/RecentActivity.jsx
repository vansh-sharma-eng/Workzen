import React from "react";
import {
  CalendarCheck,
  Home,
  SquareCheckBig,
  Bell,
} from "lucide-react";
import { useNotifications } from "../../../Utils/useNotifications";

const ICON_MAP = {
  LEAVE: { icon: CalendarCheck, color: "text-amber-400" },
  WFH: { icon: Home, color: "text-indigo-400" },
  TASK: { icon: SquareCheckBig, color: "text-green-400" },
};

const timeAgo = (iso) => {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
};

const RecentActivity = () => {
  const { notifications, loading } = useNotifications();
  const recent = notifications.slice(0, 6);

  return (
    <div className="bg-[#10111C] border border-[#1E2235] rounded-md h-auto overflow-y-auto p-5">
      <h2 className="text-white text-xl font-bold mb-5">
        Recent Activity
      </h2>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500 gap-2">
          <Bell size={20} className="opacity-50" />
          <p className="text-sm">Nothing new yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recent.map((activity) => {
            const { icon: Icon, color } = ICON_MAP[activity.type] || { icon: Bell, color: "text-gray-400" };

            return (
              <div
                key={activity.id}
                className="bg-[#1f222985] border border-gray-800 rounded-md p-5 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`${color} mt-1`}>
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="text-white text-md font-semibold">
                        {activity.title}
                      </h3>

                      <p className="text-gray-500 text-md">
                        {activity.message}
                      </p>
                    </div>
                  </div>

                  <span className="text-gray-500 text-sm whitespace-nowrap">
                    {timeAgo(activity.createdAt)}
                  </span>
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
