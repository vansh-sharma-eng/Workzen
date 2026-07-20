import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  SquareCheckBig,
  UserCircle,
  Settings,
  Home,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import leaveApi from "../../../api/leaveApi";

const HRSidebar = ({
  data,
  activePage,
  setActivePage,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const { theme } = useTheme();

  const [pendingCount, setPendingCount] = useState(0);
  const hrId = data?.id;

  useEffect(() => {
    if (!hrId) return;
    let cancelled = false;

    const check = () => {
      leaveApi
        .getPending({ managerId: hrId })
        .then((res) => { if (!cancelled) setPendingCount((res || []).length); })
        .catch(() => {});
    };

    check();
    const interval = setInterval(check, 30_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [hrId]);

  const navGroups = [
    {
      label: "Overview",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
        },
      ],
    },

    {
      label: "People",
      items: [
        {
          icon: Users,
          label: "Employees",
        },
        {
          icon: Clock,
          label: "Attendance",
        },
        {
          icon: Home,
          label: "My Attendance",
        },
        {
          icon: Calendar,
          label: "Leave Management",
          badge: pendingCount > 0 ? pendingCount : null,
        },
      ],
    },

{label:"Communication",
  items:[
    {icon:SquareCheckBig ,
      label:"Create Task",
    }
  ]

},
    {
      label: "Admin",
      items: [
        {
          icon: UserCircle,
          label: "Profile",
        },
        {
          icon: Settings,
          label: "Settings",
        },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen border-r flex flex-col z-40 transition-all duration-300
      ${
        theme === "dark"
          ? "bg-[#10111C] border-[#1E2235]"
          : "bg-white border-slate-200"
      }
      ${sidebarCollapsed ? "w-16" : "w-56"}`}
    >
      {/* Logo */}
      <div
        className={`px-4 py-4 border-b ${
          theme === "dark" ? "border-[#1E2235]" : "border-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold">
            W
          </div>

          {!sidebarCollapsed && (
            <div>
              <h2
                className={`font-bold text-sm ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                WorkZen
              </h2>

              <p
                className={`text-[10px] ${
                  theme === "dark"
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                HR Console
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!sidebarCollapsed && (
              <p
                className={`px-3 mb-2 text-[10px] uppercase tracking-widest font-semibold ${
                  theme === "dark"
                    ? "text-slate-500"
                    : "text-slate-400"
                }`}
              >
                {group.label}
              </p>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => setActivePage(item.label)}
                    title={sidebarCollapsed ? item.label : ""}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                    ${
                      sidebarCollapsed ? "justify-center" : ""
                    }
                    ${
                      active
                        ? "bg-indigo-600 text-white"
                        : theme === "dark"
                        ? "text-slate-300 hover:bg-[#181C2E]"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="relative">
                      <Icon size={18} />

                      {sidebarCollapsed && item.badge && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                      )}
                    </div>

                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-left text-sm">
                          {item.label}
                        </span>

                        {item.badge && (
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-red-500 text-white">
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


      <div className="p-2">
        <button
          onClick={() =>
            setSidebarCollapsed(!sidebarCollapsed)
          }
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-2 transition
          ${
            theme === "dark"
              ? "text-slate-300 hover:bg-[#181C2E]"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default HRSidebar;