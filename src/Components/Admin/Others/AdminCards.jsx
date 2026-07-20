import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  ClipboardList,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const AdminCards = ({ data, sidebarCollapsed }) => {
  // Live date/time — ticks every 30s so it never goes stale on a long-open tab.
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const cards = [
    {
      title: "Total Employees",
      value: data?.totalEmployees ?? 0,
      subtitle: `${data?.totalDepartments ?? 0} department${data?.totalDepartments === 1 ? "" : "s"}`,
      trend: data?.newThisMonth > 0 ? `+${data.newThisMonth} this month` : "No change this month",
      positive: (data?.newThisMonth ?? 0) >= 0,
      icon: Users,
    },
    {
      title: "Present Today",
      value: data?.presentToday ?? 0,
      subtitle: `${data?.attendanceRate ?? "0%"} attendance`,
      trend: `${data?.lateToday ?? 0} arrived late`,
      positive: (data?.lateToday ?? 0) === 0,
      icon: UserCheck,
    },
    {
      title: "On Leave",
      value: data?.onLeaveToday ?? 0,
      subtitle: `${data?.pendingLeaveRequests ?? 0} pending request${data?.pendingLeaveRequests === 1 ? "" : "s"}`,
      trend: (data?.pendingLeaveRequests ?? 0) > 0 ? "Needs review" : "All caught up",
      positive: (data?.pendingLeaveRequests ?? 0) === 0,
      icon: UserX,
    },
    {
      title: "Task Completion",
      value: `${data?.taskCompletionRate ?? 0}%`,
      subtitle: `${data?.completedCount ?? 0} of ${data?.totalTasks ?? 0} tasks done`,
      trend: `${data?.inProgressTasks ?? 0} in progress`,
      positive: (data?.taskCompletionRate ?? 0) >= 50,
      icon: ClipboardList,
    },
  ];

  return (
    <div
      className={`
        mt-15
        transition-all
        duration-300
        ${
          sidebarCollapsed
            ? "ml-17 w-[calc(100%-4rem)]"
            : "ml-57 w-[calc(100%-14rem)]"
        }
      `}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[15px] tracking-wide text-[#94a3b8] font-mono">
          {now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
          <span className="text-[#4b5568] ml-2">
            {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </h2>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[14px] mr-3 text-emerald-400 font-mono">
            Live data
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="
                h-[150px]
                w-full
                rounded-xl
                border
                border-[#1c2237]
                bg-[#13141F]
                px-4
                py-4
                flex
                flex-col
                transition-all
                duration-300
              "
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <h3 className="text-[13px] font-medium text-[#b8c1d1]">
                  {card.title}
                </h3>

                <div className="w-9 h-9 rounded-md bg-[#151933] flex items-center justify-center">
                  <Icon
                    size={15}
                    strokeWidth={1.8}
                    className="text-[#6366f1]"
                  />
                </div>
              </div>

             
              <h2 className="mt-1 text-[26px] leading-none font-bold text-white">
                {card.value}
              </h2>

              {/* Subtitle */}
              <p className="mt-2 text-[12px] text-[#9aa5b8]">
                {card.subtitle}
              </p>

              {/* Trend */}
              <div
                className={`mt-auto flex items-center gap-2 text-[12px] font-mono ${
                  card.positive
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {card.positive ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}

                <span>{card.trend}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminCards;
