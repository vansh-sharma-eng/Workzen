import { useState, useEffect } from "react";
import { LogOut, Bell, EllipsisVertical, Trash2, X } from "lucide-react";

const EmployeeHeader = ({
  data,
  handleLogout,
  unreadNotifications,
  markNotificationsRead,
  clearNotifications,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );

  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest("#notif-dropdown") && !e.target.closest("#bell-btn")) {
        setShowNotifications(false);
      }
      if (!e.target.closest("#menu-dropdown") && !e.target.closest("#menu-btn")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const statusBadge = () => {
    if (data.leaveStatus === "approved")
      return (
        <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> On Leave
        </span>
      );
    if (data.leaveStatus === "pending")
      return (
        <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> Leave Pending
        </span>
      );
    return (
      <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
      </span>
    );
  };

  const handleBellClick = () => {
    const next = !showNotifications;
    setShowNotifications(next);
    if (next && unreadNotifications > 0) markNotificationsRead();
  };

  const handleClearAll = () => {
    clearNotifications();
    setShowNotifications(false);
  };

  return (
    <div className="flex justify-between items-center px-5 py-5 border-b border-slate-800 relative">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">
          Hello, <span className="text-violet-400">{data.Name}</span>
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-slate-500">
            {day}, {date} · {time}
          </p>
          {statusBadge()}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Bell Button */}
        <div className="relative">
          <button
            id="bell-btn"
            onClick={handleBellClick}
            className="relative p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
          >
            <Bell size={18} />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-violet-600 rounded-full text-[9px] text-white flex items-center justify-center font-semibold">
                {unreadNotifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              id="notif-dropdown"
              className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-200">
                    Notifications
                  </p>
                  {unreadNotifications > 0 && (
                    <span className="h-4 px-1.5 bg-violet-600 rounded-full text-[9px] text-white flex items-center justify-center font-semibold">
                      {unreadNotifications} new
                    </span>
                  )}
                </div>
                {data.notifications?.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-red-400 transition-all px-2 py-1 rounded-lg hover:bg-slate-700/60"
                  >
                    <Trash2 size={11} />
                    Clear all
                  </button>
                )}
              </div>

              {/* Notification List */}
              {!data.notifications?.length ? (
                <div className="px-4 py-8 text-center">
                  <Bell size={24} className="text-slate-700 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">No notifications yet</p>
                </div>
              ) : (
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-700/50">
                  {[...(data.notifications || [])].reverse().map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 transition-all ${
                        !n.read ? "bg-violet-600/5 border-l-2 border-l-violet-500" : ""
                      }`}
                    >
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-1">
                        {new Date(n.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menu Button */}
        <div className="relative">
          <button
            id="menu-btn"
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
          >
            <EllipsisVertical size={18} />
          </button>
          {showMenu && (
            <div
              id="menu-dropdown"
              className="absolute right-0 mt-2 w-36 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-1.5 z-50"
            >
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;