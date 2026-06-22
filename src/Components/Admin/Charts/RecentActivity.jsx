import {
  UserPlus,
  Calendar,
  CheckCircle2,
  FileText,
} from "lucide-react";

const activities = [
  {
    title: "New employee joined",
    description: "Sarah Johnson joined Engineering.",
    time: "5 min ago",
    icon: UserPlus,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    title: "Leave request approved",
    description: "Michael Chen's leave was approved.",
    time: "20 min ago",
    icon: Calendar,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Task completed",
    description: "Marketing campaign review completed.",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    title: "Document uploaded",
    description: "Q2 HR policy document uploaded.",
    time: "2 hours ago",
    icon: FileText,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
];

const RecentActivity = () => {
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


      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex gap-4 items-start"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activity.bg}`}
              >
                <Icon
                  size={15}
                  className={activity.color}
                />
              </div>

              
              <div className="flex-1 border-b border-[#1A2035] pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-sm font-medium">
                    {activity.title}
                  </h3>

                  <span className="text-xs text-[#64748B]">
                    {activity.time}
                  </span>
                </div>

                <p className="text-[#94A3B8] text-sm mt-1">
                  {activity.description}
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