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

const HRHeader = ({
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
      title: "HR Dashboard",
      sub: "Welcome back. Here's your workforce overview.",
    },
    Employees: {
      title: "Employees",
      sub: "Manage employee information.",
    },
    Attendance: {
      title: "Attendance",
      sub: "Track daily attendance records.",
    },
    "Leave Management": {
      title: "Leave Management",
      sub: "Review and approve leave requests.",
    },
    Recruitment: {
      title: "Recruitment",
      sub: "Manage hiring and candidates.",
    },
    Payroll: {
      title: "Payroll",
      sub: "Manage employee salaries.",
    },
    Documents: {
      title: "Documents",
      sub: "Access and manage HR documents.",
    },
    Settings: {
      title: "Settings",
      sub: "Configure HR preferences.",
    },
  };

  const current = pageMeta[activePage] || {
    title: activePage || "HR Dashboard",
    sub: "Welcome back. Here's your workforce overview.",
  };

  const firstName = data?.Name?.split(" ")[0] || "HR";

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-17 border-b flex items-center justify-between px-6 transition-all duration-300
      ${
        theme === "dark"
          ? "bg-[#10111C] border-[#1E2235]"
          : "bg-white border-slate-200"
      }
      ${isSidebarCollapsed ? "left-16" : "left-55"}`}
    >
      {/* Left */}
      <div>
        <h1
          className={`text-lg font-bold ${
            theme === "dark" ? "text-slate-100" : "text-slate-900"
          }`}
        >
          {current.title}
        </h1>

        <p
          className={`text-xs mt-0.5 ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {current.sub.replace(
            "Welcome back",
            `Welcome back, ${firstName}`
          )}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 mr-3">
        
         <button
          onClick={() => setShowNotifications(!showNotifications)}
          className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition
          ${
            theme === "dark"
              ? "hover:bg-[#1A1D2E]"
              : "hover:bg-slate-100"
          }`}
        >
          <Brain size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        {/* Theme */}
        <button
          onClick={toggleTheme}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition
          ${
            theme === "dark"
              ? "hover:bg-[#1A1D2E]"
              : "hover:bg-slate-100"
          }`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition
          ${
            theme === "dark"
              ? "hover:bg-[#1A1D2E]"
              : "hover:bg-slate-100"
          }`}
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {data?.Name?.charAt(0) || "H"}
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform ${
                showMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showMenu && (
            <div
              className={`absolute right-0 mt-3 w-48 rounded-xl border shadow-xl overflow-hidden
              ${
                theme === "dark"
                  ? "bg-[#181C2E] border-[#2B3148]"
                  : "bg-white border-slate-200"
              }`}
            >
              <button
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition
                ${
                  theme === "dark"
                    ? "hover:bg-[#232844]"
                    : "hover:bg-slate-100"
                }`}
              >
                <User size={16} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 transition
                ${
                  theme === "dark"
                    ? "hover:bg-[#232844]"
                    : "hover:bg-slate-100"
                }`}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HRHeader;