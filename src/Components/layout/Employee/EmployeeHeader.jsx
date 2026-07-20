import { useEffect, useRef, useState } from "react";
import {
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Info,
  CheckCheck,
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
  LEAVE: "My Leave",
  WFH: "My Attendance",
  TASK: "My Tasks",
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

const EmployeeHeader = ({
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
    Overview: {
      title: "Overview",
      sub: "Welcome back. Here's your workspace summary.",
    },
    "My Tasks": {
      title: "My Tasks",
      sub: "Track your assigned tasks.",
    },
    "My Attendance": {
      title: "My Attendance",
      sub: "Monitor your attendance records.",
    },
    "My Leave": {
      title: "My Leave",
      sub: "Manage leave requests and history.",
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
    title: "Overview",
    sub: "Welcome back.",
  };

  const name = data?.name || data?.Name || "Employee";
  const firstName = name.split(" ")[0];

  return (
    <div
      className={`fixed top-0 right-0 z-30 h-16.5 border-b
      flex items-center justify-between px-6
      transition-all duration-300
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
          className={`text-lg font-bold
          ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          {current.title}
        </h1>

        <p
          className={`text-xs mt-0.5
          ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          {current.sub.replace(
            "Welcome back",
            `Welcome back, ${firstName}`
          )}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition
          ${
            theme === "dark"
              ? "hover:bg-slate-800 text-white"
              : "hover:bg-slate-100 text-slate-700"
          }`}
        >
          {theme === "dark" ? (
            <Sun size={17} />
          ) : (
            <Moon size={17} />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifications((v) => !v); setShowMenu(false); }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition relative
            ${
              theme === "dark"
                ? "hover:bg-slate-800 text-white"
                : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <Bell size={17} />

            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className={`absolute right-0 mt-3 w-80 max-h-[26rem] rounded-2xl shadow-2xl overflow-hidden z-50
              ${
                theme === "dark"
                  ? "bg-[#13162A] border border-[#1E2235]"
                  : "bg-white border border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-700/20">
                <h3
                  className={`font-semibold
                  ${
                    theme === "dark"
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  Notifications
                </h3>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
                  >
                    <CheckCheck size={13} /> Mark all read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm flex flex-col items-center gap-2">
                  <Info size={20} className="opacity-50" />
                  No Notifications
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((item) => {
                    const Icon = NOTIF_ICON[item.type] || Info;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          markRead(item.id);
                          const target = NOTIF_TARGET_PAGE[item.type];
                          if (target) {
                            setActivePage?.(target);
                            setShowNotifications(false);
                          }
                        }}
                        className={`w-full text-left group relative p-4 border-b transition-all flex gap-3
                        ${
                          theme === "dark"
                            ? "border-slate-700/10 hover:bg-slate-800/20"
                            : "border-slate-200 hover:bg-slate-50"
                        } ${!item.read ? (theme === "dark" ? "bg-indigo-500/[0.04]" : "bg-indigo-50/60") : ""}`}
                      >
                        <div className={`mt-0.5 w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${
                          theme === "dark" ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-100 text-indigo-600"
                        }`}>
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-medium text-sm truncate
                              ${
                                theme === "dark"
                                  ? "text-white"
                                  : "text-slate-900"
                              }`}
                            >
                              {item.title}
                            </h4>
                            {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-2">
                            {item.message}
                          </p>

                          <span className="text-[10px] text-slate-500 mt-1 block">
                            {timeAgo(item.createdAt)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => { setShowMenu((v) => !v); setShowNotifications(false); }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              {name.charAt(0).toUpperCase()}
            </div>

            <ChevronDown size={14} />
          </button>

          {showMenu && (
            <div
              className={`absolute right-0 mt-2 w-44 rounded-xl p-2 shadow-xl z-50
              ${
                theme === "dark"
                  ? "bg-[#13162A] border border-[#1E2235]"
                  : "bg-white border"
              }`}
            >
              <button
                onClick={() => { setActivePage?.("Profile"); setShowMenu(false); }}
                className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-slate-700/20"
              >
                <User size={14} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-red-500/10 text-red-500"
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

export default EmployeeHeader;
