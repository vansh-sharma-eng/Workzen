
import { useState, useEffect } from "react";
import { LayoutDashboard, Users , Building2 ,Calendar, Wallet,ClipboardCheck,SquareCheckBig,Megaphone,FileText,Settings} from "lucide-react";

const AdminSidebar = ({ data, activePage, setActivePage }) => {
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);

  useEffect(() => {
    const checkPending = () => {
      const employees = JSON.parse(localStorage.getItem("employeeData")) || [];
      const count = employees.filter((e) => e.leaveStatus === "pending").length;
      setPendingLeaveCount(count);
    };
    checkPending();
    const interval = setInterval(checkPending, 3000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { icon: <LayoutDashboard size={15} strokeWidth={1.5} />, label: "Dashboard" },
    { icon: <Users  size={15} strokeWidth={1.5} />, label: "Employees" },
    { icon: <Building2  size={15} strokeWidth={1.5} />, label: "Departments" },
    { icon: <Calendar  size={15} strokeWidth={1.5} />, label: "Leaves", badge: pendingLeaveCount },
    { icon: <Wallet  size={15} strokeWidth={1.5} />, label: "Payroll",},
    { icon: <ClipboardCheck size={15} strokeWidth={1.5} />, label: "Attendance" },
    { icon:<SquareCheckBig size={15} strokeWidth={1.5} />, label: "Tasks"},
    { icon: <Megaphone size={15} strokeWidth={1.5} />, label: "Annoucements" },
    { icon: <FileText size={15} strokeWidth={1.5} />, label: "Reports"},
    { icon: <Settings size={15} strokeWidth={1.5} />, label: "Settings" },
  ];

  return (
    <div className="sidebar-scroll h-screen fixed w-58 top-0 left-0 bg-[#0d0f14] border-r border-[#1e2333] flex flex-col justify-between py-6">
      <div>
        <div className="flex items-center gap-3 px-5  ">
          <div className="h-9 w-9 flex items-center justify-center bg-[#3b82f6] rounded-xl font-bold text-white text-sm shadow-lg">W</div>
          <div>
            <h1 className="text-[#f1f5f9] font-semibold text-sm leading-tight">WorkZen</h1>
            <p className="text-[10px] text-[#60a5fa] font-medium tracking-widest">ADMIN</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-3 mt-7 h-100 overflow-auto ">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActivePage(item.label)}
              className={`flex items-center gap-4 px-4 py-2 rounded-xl text-md cursor-pointer transition-all border-l-2
                ${activePage === item.label
                  ? "bg-[#1e2333] text-[#f1f5f9] border-[#3b82f6]"
                  : "text-[#64748b] border-transparent "
                }`}
            >
              <span className={activePage === item.label ? "text-[#60a5fa]" : "text-[#64748b]"}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.badge > 0 && (
                <span className="h-5 w-5 bg-[#3b82f6] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 mx-3 rounded-xl bg-[#151822] border border-[#1e2333]">
        <div className="h-9 w-9 flex items-center justify-center bg-[#3b82f6] rounded-full font-bold text-white text-sm shrink-0">
          {data?.Name?.charAt(0) || "A"}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm text-[#f1f5f9] font-medium truncate">{data?.Name || "Admin"}</p>
          <p className="text-[11px] text-[#64748b] truncate">{data?.email || "admin@gmail.com"}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;