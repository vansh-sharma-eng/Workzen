import { useMemo } from "react";
import {
  TriangleAlert,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

/**
 * Rule-based alerts computed directly from real data (pending leaves,
 * overdue tasks, top department). The numbers behind each one are always
 * real and traceable back to their source page.
 * @param {{ leaves: Array, tasks: Array, deptData: Array }} props
 */
const AIAlerts = ({ leaves = [], tasks = [], deptData = [] }) => {
  const alerts = useMemo(() => {
    const list = [];
    const todayIso = new Date().toISOString().slice(0, 10);

    const pending = leaves.filter((l) => l.status === "PENDING").length;
    if (pending > 0) {
      list.push({
        title: "Leave requests pending",
        description: `${pending} request${pending === 1 ? "" : "s"} awaiting a decision.`,
        icon: Clock,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
      });
    }

    const overdue = tasks.filter(
      (t) => t.dueDate && t.dueDate < todayIso && t.status !== "COMPLETED"
    ).length;
    if (overdue > 0) {
      list.push({
        title: "Overdue tasks",
        description: `${overdue} task${overdue === 1 ? " is" : "s are"} past their due date.`,
        icon: TriangleAlert,
        color: "text-red-400",
        bg: "bg-red-500/10",
      });
    }

    if (deptData.length > 0) {
      const top = deptData[0];
      list.push({
        title: "Top performing department",
        description: `${top.department} leads with a ${top.score}% task completion rate.`,
        icon: TrendingUp,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
      });
    }

    if (list.length === 0) {
      list.push({
        title: "All clear",
        description: "No pending leaves or overdue tasks right now.",
        icon: CheckCircle2,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
      });
    }

    return list;
  }, [leaves, tasks, deptData]);

  return (
    <div className="bg-[#13141F] border border-[#1E2337] rounded-xl p-5 w-86 overflow-y-auto h-[320px]">
      <div className="mb-5">
        <h2 className="text-white text-[16px] font-semibold">
          Alerts
        </h2>

        <p className="text-[#94A3B8] text-[9px]">
          Live, computed from today's data
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
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${alert.bg}`}>
                <Icon size={10} className={alert.color} />
              </div>

              <div>
                <h3 className="text-white text-xs font-medium">{alert.title}</h3>
                <p className="text-[#94A3B8] text-[12px] mt-1">{alert.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIAlerts;
