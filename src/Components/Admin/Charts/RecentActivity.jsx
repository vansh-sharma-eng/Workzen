import {
  UserPlus,
  Calendar,
  CheckCircle2,
  Megaphone,
  Bell,
} from "lucide-react";

const ICON_BY_TYPE = {
  LEAVE: { icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  TASK: { icon: CheckCircle2, color: "text-orange-400", bg: "bg-orange-500/10" },
  ANNOUNCEMENT: { icon: Megaphone, color: "text-sky-400", bg: "bg-sky-500/10" },
  SYSTEM: { icon: UserPlus, color: "text-indigo-400", bg: "bg-indigo-500/10" },
};

const timeAgo = (iso) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) === 1 ? "" : "s"} ago`;
};

/** @param {{ notifications: Array }} props — this admin's real notification feed, reused as an activity log */
const RecentActivity = ({ notifications = [] }) => {
  const activities = notifications.slice(0, 6);

  return (
    <div className="bg-[#13141F] border border-[#1E2337] rounded-xl w-86  p-5">
      <div className="mb-6">
        <h2 className="text-white text-[13px] font-semibold">
          Recent Activity
        </h2>

        <p className="text-[#94A3B8] text-xs">
          Latest actions across the organization
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="h-[120px] flex flex-col items-center justify-center text-[#64748B] text-xs gap-2">
          <Bell size={18} className="opacity-40" />
          Nothing new yet.
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const meta = ICON_BY_TYPE[activity.type] || ICON_BY_TYPE.SYSTEM;
            const Icon = meta.icon;

            return (
              <div key={activity.id} className="flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.bg}`}>
                  <Icon size={15} className={meta.color} />
                </div>

                <div className="flex-1 border-b border-[#1A2035] pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-sm font-medium">{activity.title}</h3>
                    <span className="text-xs text-[#64748B] shrink-0 ml-2">{timeAgo(activity.createdAt)}</span>
                  </div>

                  <p className="text-[#94A3B8] text-sm mt-1 line-clamp-2">{activity.message}</p>
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
