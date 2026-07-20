import React, { useEffect, useRef, useState } from "react";
import {
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  User,
  CheckCheck,
  Info,
  CalendarCheck,
  Home,
  SquareCheckBig,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import { useNotifications } from "../../../Utils/useNotifications";

const NOTIF_ICON = {
  LEAVE: CalendarCheck,
  WFH: Home,
  TASK: SquareCheckBig,
};

const NOTIF_TARGET_PAGE = {
  LEAVE: "Leave Management",
  WFH: "Attendance",
  TASK: "Create Task",
};

const timeAgo = (iso) => {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const HRHeader = ({
  activePage,
  setActivePage,
  data,
  isSidebarCollapsed,
  handleLogout,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();

  const menuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

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
    "My Attendance": {
      title: "My Attendance",
      sub: "Punch in, punch out, and track your own attendance.",
    },
    "Leave Management": {
      title: "Leave Management",
      sub: "Review and approve leave requests.",
    },
    "Create Task": {
      title: "Tasks",
      sub: "Create and assign tasks to employees.",
    },
    Profile: {
      title: "Profile",
      sub: "View and update your profile.",
    },
    Settings: {
      title: "Settings",
      sub: "Manage your preferences and access.",
    },
  };

  const current = pageMeta[activePage] || {
    title: activePage || "HR Dashboard",
    sub: "Welcome back. Here's your workforce overview.",
  };

  const name = data?.name || data?.Name || "HR";
  const firstName = name.split(" ")[0];

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
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifications((v) => !v); setShowMenu(false); }}
            className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition
            ${
              theme === "dark"
                ? "hover:bg-[#1A1D2E]"
                : "hover:bg-slate-100"
            } ${showNotifications ? (theme === "dark" ? "bg-[#1A1D2E]" : "bg-slate-100") : ""}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex">
                <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-96 max-h-[28rem] rounded-xl shadow-2xl border overflow-hidden z-50 ${
                theme === "dark" ? "bg-[#0B0C14] border-[#1E2235]" : "bg-white border-slate-200"
              }`}
            >
              <div className={`flex items-center justify-between px-4 py-3 border-b ${theme === "dark" ? "border-[#1E2235]" : "border-slate-200"}`}>
                <span className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
                  >
                    <CheckCheck size={13} /> Mark all read
                  </button>
                )}
              </div>

              <div className="overflow-y-auto max-h-[22rem]">
                {notifications.length === 0 && (
                  <div className="p-6 text-center text-sm text-gray-500 flex flex-col items-center gap-2">
                    <Info size={20} className="opacity-50" />
                    You're all caught up.
                  </div>
                )}

                {notifications.map((n) => {
                  const Icon = NOTIF_ICON[n.type] || Info;
                  return (
                    <button
                      key={n.id}
                      onClick={() => {
                        markRead(n.id);
                        const target = NOTIF_TARGET_PAGE[n.type];
                        if (target) {
                          setActivePage?.(target);
                          setShowNotifications(false);
                        }
                      }}
                      className={`w-full text-left px-4 py-3 flex gap-3 border-b transition ${
                        theme === "dark" ? "border-[#1E2235] hover:bg-white/5" : "border-slate-100 hover:bg-slate-50"
                      } ${!n.read ? (theme === "dark" ? "bg-indigo-500/[0.04]" : "bg-indigo-50/60") : ""}`}
                    >
                      <div className={`mt-0.5 w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${
                        theme === "dark" ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-100 text-indigo-600"
                      }`}>
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-[13px] font-semibold truncate ${theme === "dark" ? "text-gray-100" : "text-slate-800"}`}>{n.title}</p>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                        </div>
                        <p className="text-[12px] text-gray-500 line-clamp-2 mt-0.5">{n.message}</p>
                        <p className="text-[10px] text-gray-600 mt-1">{timeAgo(n.createdAt)}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => { setShowMenu((v) => !v); setShowNotifications(false); }}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {name.charAt(0).toUpperCase()}
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
              className={`absolute right-0 mt-3 w-48 rounded-xl border shadow-xl overflow-hidden z-50
              ${
                theme === "dark"
                  ? "bg-[#181C2E] border-[#2B3148]"
                  : "bg-white border-slate-200"
              }`}
            >
              <button
                onClick={() => { setActivePage?.("Profile"); setShowMenu(false); }}
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
