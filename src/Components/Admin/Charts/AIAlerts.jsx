import {
  TriangleAlert,
  TrendingUp,
  Users,
  Brain,
} from "lucide-react";

const alerts = [
  {
    title: "High Attrition Risk",
    description:
      "4 employees show signs of disengagement.",
    icon: TriangleAlert,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    title: "Productivity Boost",
    description:
      "Engineering team increased output by 12%.",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Attendance Drop",
    description:
      "Sales attendance dropped by 6% this week.",
    icon: Users,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    title: "AI Recommendation",
    description:
      "Schedule 1-on-1 meetings with at-risk employees.",
    icon: Brain,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
];

const AIAlerts = () => {
  return (
    <div className="bg-[#13141F] border border-[#1E2337] rounded-xl p-5 w-86 overflow-y-auto h-[320px]">
      <div className="mb-5">
        <h2 className="text-white text-[16px] font-semibold">
          AI Alerts
        </h2>

        <p className="text-[#94A3B8] text-[9px]">
          Insights generated today
        </p>
      </div>

      <div className="space-y-2">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;

          return (
            <div
              key={index}
              className="flex gap-3 p-2 rounded-xl bg-[#12172A] border border-[#1E2337]"
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center ${alert.bg}`}
              >
                <Icon
                  size={10}
                  className={alert.color}
                />
              </div>

              <div>
                <h3 className="text-white text-xs font-medium">
                  {alert.title}
                </h3>

                <p className="text-[#94A3B8] text-[12px] mt-1">
                  {alert.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIAlerts;