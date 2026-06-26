import React, { useState } from "react";
import {
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Brain,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";

const AdminHeader = ({
  activePage,
  changeuser,
  data,
  isSidebarCollapsed,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    changeuser("");
  };

  const pageMeta = {
    Dashboard: {
      title: "Dashboard",
      sub: "Welcome back. Here's your team overview.",
    },
    Employees: {
      title: "Employees",
      sub: "Manage your team members.",
    },
    Attendance: {
      title: "Attendance",
      sub: "Track daily attendance records.",
    },
    "Leave Management": {
      title: "Leave Management",
      sub: "Review and manage leave requests.",
    },
    Documents: {
      title: "Documents",
      sub: "Access and manage documents.",
    },
    Settings: {
      title: "Settings",
      sub: "Configure your preferences.",
    },
  };

  const current = pageMeta[activePage] || {
    title: activePage || "Dashboard",
    sub: "Welcome back. Here's your team overview.",
  };

  const firstName = data?.Name?.split(" ")[0] || "Admin";

  return (
    <div
      className={`fixed top-0 right-0 z-30 h-16 border-b flex items-center justify-between px-6 transition-all duration-300
      ${
        theme === "dark"
          ? "bg-[#10111C] border-[#1E2235]"
          : "bg-white border-slate-200"
      }
      ${isSidebarCollapsed ? "left-16" : "left-50"}`}
    >
      <div>
        <h1
          className={`text-[17px] ml-5 font-bold ${
            theme === "dark"
              ? "text-[#F1F5F9]"
              : "text-slate-900"
          }`}
        >
          {current.title}
        </h1>

        <p
          className={`text-[10px] ml-5 mt-0.5 font-semibold ${
            theme === "dark"
              ? "text-[#475569]"
              : "text-slate-500"
          }`}
        >
          {current.sub.replace(
            "Welcome back",
            `Welcome back, ${firstName}`
          )}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
          className="w-8 h-8 flex items-center justify-center rounded-xl"
        >
          <Brain size={17} />
        </button>

        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-xl"
        >
          {theme === "dark" ? (
            <Sun size={17} />
          ) : (
            <Moon size={17} />
          )}
        </button>

        <button
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
          className="w-8 h-8 flex items-center justify-center rounded-xl"
        >
          <Bell size={17} />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
              {data?.Name?.charAt(0) || "A"}
            </div>

            <ChevronDown size={14} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-xl p-2">
              <button className="flex items-center gap-2 w-full p-2">
                <User size={14} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full p-2"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;