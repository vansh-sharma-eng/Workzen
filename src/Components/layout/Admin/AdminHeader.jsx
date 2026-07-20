import React, { useEffect, useRef, useState } from "react";
import {
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  User,
  X,
  CheckCheck,
  Megaphone,
  ListChecks,
  CalendarDays,
  Info,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import { useNotifications } from "../../../Utils/useNotifications";
import ProfilePage from "../../../Pages/ProfilePage";

const NOTIF_ICON = {
  LEAVE: CalendarDays,
  TASK: ListChecks,
  ANNOUNCEMENT: Megaphone,
};

const timeAgo = (iso) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const NOTIF_TARGET_PAGE = {
  LEAVE: "Leave Management",
  WFH: "Attendance",
  EMPLOYEE_REQUEST: "Employees",
};

const AdminHeader = ({
  activePage,
  setActivePage,
  data,
  isSidebarCollapsed,
  handleLogout,
  onUserUpdate,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowProfileModal(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

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

  const firstName = (data?.name || data?.Name || "Admin").split(" ")[0];

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
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className={`w-8 h-8 flex items-center justify-center rounded-xl transition ${
            theme === "dark" ? "hover:bg-white/5 text-gray-300" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          {theme === "dark" ? (
            <Sun size={17} />
          ) : (
            <Moon size={17} />
          )}
        </button>

        {/* Notifications — real data, polled from the backend */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications((v) => !v);
              setShowMenu(false);
            }}
            title="Notifications"
            className={`relative w-8 h-8 flex items-center justify-center rounded-xl transition ${
              theme === "dark" ? "hover:bg-white/5 text-gray-300" : "hover:bg-slate-100 text-slate-600"
            } ${showNotifications ? (theme === "dark" ? "bg-white/5" : "bg-slate-100") : ""}`}
          >
            <Bell size={17} />
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
              className={`absolute right-0 mt-2 w-96 max-h-[28rem] rounded-xl shadow-2xl border overflow-hidden animate-panel-in ${
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

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => {
              setShowMenu((v) => !v);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <ChevronDown size={14} className={theme === "dark" ? "text-gray-400" : "text-slate-500"} />
          </button>

          {showMenu && (
            <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border p-2 animate-panel-in ${
              theme === "dark" ? "bg-[#10111C] border-[#1E2235]" : "bg-white border-slate-200"
            }`}>
              <div className={`px-2 pb-2 mb-1 border-b ${theme === "dark" ? "border-[#1E2235]" : "border-slate-100"}`}>
                <p className={`text-sm font-semibold truncate ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{data?.name || data?.Name || "Admin"}</p>
                <p className="text-[11px] text-gray-500 truncate">{data?.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileModal(true);
                  setShowMenu(false);
                }}
                className={`flex items-center gap-2 w-full p-2 rounded-lg text-sm ${
                  theme === "dark" ? "text-gray-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <User size={14} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 w-full p-2 rounded-lg text-sm ${
                  theme === "dark" ? "text-red-400 hover:bg-red-500/10" : "text-red-600 hover:bg-red-50"
                }`}
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {showProfileModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] flex flex-col bg-[#050816] rounded-2xl border border-[#1E2235] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 h-14 border-b border-[#1E2235] shrink-0">
              <div className="flex items-center gap-2">
                <User size={16} className="text-indigo-400" />
                <span className="text-white font-semibold text-sm">Profile</span>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm bg-white/5 hover:bg-white/10 rounded-md px-3 py-1.5 transition"
              >
                <X size={14} /> Close
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <ProfilePage data={data} onUpdate={onUserUpdate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
