import { Grid3x2, ListChecks, CalendarDays, MessageCircle } from "lucide-react";

const EmployeeSidebar = ({ data, activePage, setActivePage }) => {
  const navItems = [
    { icon: <Grid3x2 size={16} strokeWidth={1.5} />, label: "Overview" },
    { icon: <ListChecks size={16} strokeWidth={1.5} />, label: "My Tasks" },
    { icon: <CalendarDays size={16} strokeWidth={1.5} />, label: "My Leave" },
    { icon: <MessageCircle size={16} strokeWidth={1.5} />, label: "Messages" },
  ];

  return (
    <div className="h-screen w-56 border-r border-slate-800 fixed top-0 left-0 bg-slate-900 flex flex-col justify-between py-5 z-40">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 px-5 mb-8">
          <div className="h-8 w-8 flex items-center justify-center bg-violet-600 rounded-lg font-bold text-white text-sm shrink-0">
            W
          </div>
          <div>
            <h1 className="text-slate-100 font-semibold text-sm">WorkZen</h1>
            <p className="text-[10px] text-violet-400 font-medium tracking-widest uppercase">
              Employee
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActivePage(item.label)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full text-left transition-all
                ${
                  activePage === item.label
                    ? "bg-violet-600/15 text-violet-400 font-medium"
                    : "text-slate-500 hover:text-slate-200 hover:bg-slate-800"
                }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* User card */}
      <div className="px-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-violet-600 font-semibold text-white text-sm shrink-0">
            {data?.Name?.charAt(0) || "E"}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm text-slate-200 font-medium truncate">
              {data?.Name || "Employee"}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {data?.email || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidebar;