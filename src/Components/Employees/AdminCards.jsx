import {
  Users,
  UserCheck,
  CalendarOff,
  Building2,
  ClipboardList,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const AdminCards = ({ data }) => {
  const cards = [
    {
      title: "Total Employees",
      value: data.totalEmployees,
      change: "+12% from last month",
      positive: true,
      icon: Users,
      iconColor: "#60a5fa",
      iconBg: "bg-[#3b82f6]/10 border border-[#3b82f6]/20",
    },
    {
      title: "Active Employees",
      value: data.activeEmployees,
      change: "+5% from last month",
      positive: true,
      icon: UserCheck,
      iconColor: "#34d399",
      iconBg: "bg-emerald-500/10 border border-emerald-500/20",
    },
    {
      title: "On Leave Today",
      value: data.onLeaveToday,
      change: "-2% from last month",
      positive: false,
      icon: CalendarOff,
      iconColor: "#fb923c",
      iconBg: "bg-orange-500/10 border border-orange-500/20",
    },
    {
      title: "Total Departments",
      value: data.totalDepartments,
      change: "+1 from last month",
      positive: true,
      icon: Building2,
      iconColor: "#c084fc",
      iconBg: "bg-purple-500/10 border border-purple-500/20",
    },
    {
      title: "Total Tasks",
      value: data.totalTasks,
      change: "+23 from last month",
      positive: true,
      icon: ClipboardList,
      iconColor: "#60a5fa",
      iconBg: "bg-[#3b82f6]/10 border border-[#3b82f6]/20",
    },
    {
      title: "Pending Tasks",
      value: data.inProgressTasks,
      change: "-8 from last month",
      positive: false,
      icon: Clock,
      iconColor: "#fbbf24",
      iconBg: "bg-amber-500/10 border border-amber-500/20",
    },
    {
      title: "Monthly Salary",
      value: data.monthlySalary,
      change: "+8% from last month",
      positive: true,
      icon: DollarSign,
      iconColor: "#34d399",
      iconBg: "bg-emerald-500/10 border border-emerald-500/20",
    },
    {
      title: "Attendance Rate",
      value: data.attendanceRate,
      change: "+2.5% from last month",
      positive: true,
      icon: TrendingUp,
      iconColor: "#2dd4bf",
      iconBg: "bg-teal-500/10 border border-teal-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ml-57 gap-4 p-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="rounded-2xl bg-[#151822] border border-[#1e2333] p-5 hover:border-[#3b82f6]/30 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-semibold text-[#64748b] tracking-widest uppercase">
                {card.title}
              </p>
              <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                <Icon size={16} color={card.iconColor} strokeWidth={1.8} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#f1f5f9] mb-2">
              {card.value}
            </h2>

            <p
              className="text-xs font-medium"
              style={{ color: card.positive ? "#34d399" : "#f87171" }}
            >
              {card.change}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminCards;