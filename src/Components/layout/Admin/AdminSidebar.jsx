import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  Heart,
  DollarSign,
  Target,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
  Building2,
  Zap,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
const AdminSidebar = ({

  data,
  activePage,
  setActivePage,
  handleLogout,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(12);
  const [aiInsightsCount, setAiInsightsCount] = useState(3);
  const { theme } = useTheme();
  useEffect(() => {
    const check = () => {
      const employees =
        JSON.parse(localStorage.getItem("employeeData")) || [];
      setPendingCount(
        employees.filter((e) => e.leaveStatus === "pending").length
      );
    };
    check();
    const interval = setInterval(check, 3000);
    return () => clearInterval(interval);
  }, []);

  const navGroups = [
    {
      label: "Overview",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          badge: null,
        },
        {
          icon: Brain,
          label: "AI Insights",
          badge: aiInsightsCount,
        },
      ],
    },
    {
      label: "People",
      items: [
        {
          icon: Users,
          label: "Employees",
          badge: null,
        },
        {
          icon: Clock,
          label: "Attendance",
          badge: null,
        },
        {
          icon: Calendar,
          label: "Leave Management",
          badge: pendingCount > 0 ? pendingCount : null,
        },
        {
          icon: Heart,
          label: "Mood Tracker",
          badge: null,
        },
      ],
    },
    {
      label: "Finance & Growth",
      items: [
        {
          icon: DollarSign,
          label: "Payroll & Finance",
          badge: null,
        },
        {
          icon: Target,
          label: "OKR & Goals",
          badge: null,
        },
      ],
    },
    {
      label: "System",
      items: [
        {
          icon: FileText,
          label: "Documents",
          badge: null,
        },
        {
          icon: Settings,
          label: "Settings",
          badge: null,
        },
      ],
    },
  ];

  return (
    <div
  className={`h-screen fixed top-0 left-0 flex flex-col z-40 transition-all duration-300 ease-in-out border-r
    ${sidebarCollapsed ? "w-16" : "w-55"}`}
  style={{
    backgroundColor: "var(--bg-primary)",
    borderColor: "var(--border-primary)",
    color: "var(--text-primary)",
    color: "#00000",
  }}
>
      {/* ── Logo ── */}
      <div className="px-4 py-4 mt-0.5 border-b border-[#1E2235]">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]
              rounded-xl flex items-center justify-center shadow-lg
              shrink-0 font-bold text-white text-sm"
          >W</div>
          {!sidebarCollapsed && (
            <span className="text-white font-bold text-sm tracking-tight">
              WorkZen
            </span>
          )}
        </div>
      </div>

      {/* ── Nav ── */}
      <div className="flex-1 overflow-y-auto py-3 text-sm px-2 space-y-5 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.label}>
            {/* Group label — hidden when collapsed */}
            {!sidebarCollapsed && (
              <p
                className="text-[7px] font-semibold text-[#3D4466]
                  uppercase tracking-widest px-3 mb-1.5"
              >
                {group.label}
              </p>
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => setActivePage(item.label)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl
                      text-xs transition-all duration-150 group relative
                      ${sidebarCollapsed ? "justify-center" : ""}
                      ${
                        isActive
                          ? "bg-[#1A1F35] text-[#818CF8]"
                          : "text-[#bebebe] hover:bg-[#13162A] hover:text-[#9CA3AF]"
                      }`}
                  >
                    {/* Icon */}
                    <div className="relative shrink-0">
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 1 : 1}
                        className={
                          isActive
                            ? "text-[#818CF8]"
                            : "text-[#dfdfe0] group-hover:text-[#ebecec]"
                        }
                      />
                      {/* Dot badge in collapsed mode */}
                      {sidebarCollapsed && item.badge > 0 && (
                        <span
                          className="absolute -top-1 -right-1 w-2 h-2
                            bg-[#6366F1] rounded-full"
                        />
                      )}
                    </div>

                    {/* Label + badge — expanded mode */}
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-left font-medium truncate">
                          {item.label}
                        </span>
                        {item.badge > 0 && (
                          <span
                            className="h-5 min-w-5 px-1.5 bg-[#4F46E5]
                              rounded-full text-[10px] text-white flex
                              items-center justify-center font-bold"
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

        {/* Collapse button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`w-full flex items-center gap-2 px-3 py-3 mb-2 rounded-xl
            text-[#c3c3c3] hover:bg-[#13162A] hover:text-[#fefefe]
            transition-all text-xs font-medium
            ${sidebarCollapsed ? "justify-center" : "justify-center"}`}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={14} />
          ) : (
            <>
              <ChevronLeft size={14} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    
  );
};

export default AdminSidebar;