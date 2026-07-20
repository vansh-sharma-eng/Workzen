import {
  Grid3x2,
  ListChecks,
  Clock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Settings,
} from "lucide-react";

const EmployeeSidebar = ({
  activePage,
  setActivePage,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const navGroups = [
    {
      label: "Overview",
      items: [
        {
          icon: Grid3x2,
          label: "Overview",
        },
      ],
    },
    {
      label: "Work",
      items: [
        {
          icon: ListChecks,
          label: "My Tasks",
        },
        {
          icon: Clock,
          label: "My Attendance",
        },
        {
          icon: CalendarDays,
          label: "My Leave",
        },
      ],
    },
    {
      label: "Account",
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
    <div
      className={`h-screen fixed top-0 left-0 flex flex-col z-40 transition-all duration-300 ease-in-out border-r
      ${sidebarCollapsed ? "w-16" : "w-55"}`}
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-primary)",
        color: "var(--text-primary)",
      }}
    >
      
      <div className="px-4 py-4 mt-0.5 border-b border-[#1E2235]">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]
            rounded-xl flex items-center justify-center shadow-lg
            shrink-0 font-bold text-white text-sm"
          >
            W
          </div>

          {!sidebarCollapsed && (
            <span className="text-white font-bold text-sm tracking-tight">
              WorkZen
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-3 text-xl px-2 space-y-5 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!sidebarCollapsed && (
              <p
                className="text-[7px] font-semibold text-[#3D4466]
                uppercase tracking-widest px-3 mb-1.5"
              >
                {group.label}
              </p>
            )}

            <div className="space-y-0.5 mt-6">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => setActivePage(item.label)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                    text-xs transition-all duration-150  group relative
                    ${sidebarCollapsed ? "justify-center" : ""}
                    ${
                      isActive
                        ? "bg-[#1A1F35] text-[#818CF8]"
                        : "text-[#bebebe] hover:bg-[#13162A] hover:text-[#9CA3AF]"
                    }`}
                  >
                    <div className="relative shrink-0 ">
                      <Icon
                        size={18}
                        strokeWidth={2}
                        className={
                          isActive
                            ? "text-[#818CF8]"
                            : "text-[#dfdfe0] group-hover:text-[#ebecec]"
                        }
                      />
                    </div>

                    {!sidebarCollapsed && (
                      <span className="flex-1 text-left font-medium text-[12px] truncate">
                        {item.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

   
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={`w-full flex items-center gap-2 px-3 py-3 mb-2 rounded-xl
        text-[#c3c3c3] hover:bg-[#13162A] hover:text-[#fefefe]
        transition-all text-xs font-medium justify-center`}
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

export default EmployeeSidebar;