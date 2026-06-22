import { useState } from "react";
import {
Sun,
Moon,
Bell,
ChevronDown,
LogOut,
User,
X,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";

const EmployeeHeader = ({
activePage,
changeuser,
data,
isSidebarCollapsed,
}) => {
const [showMenu, setShowMenu] = useState(false);
const [showNotifications, setShowNotifications] =
useState(false);

const [notifications, setNotifications] =
useState([
{
id: 1,
title: "Task Assigned",
message:
"You have been assigned a new task.",
time: "2 min ago",
},
{
id: 2,
title: "Leave Approved",
message:
"Your leave request has been approved.",
time: "1 hour ago",
},
{
id: 3,
title: "Payroll Generated",
message:
"June payroll has been generated.",
time: "Today",
},
]);

const { theme, toggleTheme } = useTheme();

const removeNotification = (id) => {
setNotifications((prev) =>
prev.filter((item) => item.id !== id)
);
};

const handleLogout = () => {
localStorage.removeItem("loggedInUser");
changeuser("");
};

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
"My Goals/OKR": {
title: "Goals & OKRs",
sub: "Track your performance goals.",
},
"My Payroll": {
title: "Payroll",
sub: "View salary and payroll details.",
},
"Mood Check-In": {
title: "Mood Check-In",
sub: "Share your wellness status.",
},
"My Documents": {
title: "Documents",
sub: "Access your uploaded documents.",
},
};

const current = pageMeta[activePage] || {
title: "Overview",
sub: "Welcome back.",
};

const firstName =
data?.Name?.split(" ")[0] || "Employee";

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
{/* Left */} <div>
<h1
className={`text-lg font-bold
          ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }`}
>
{current.title} </h1>

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
    <div className="relative">
      <button
        onClick={() =>
          setShowNotifications(
            !showNotifications
          )
        }
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition relative
        ${
          theme === "dark"
            ? "hover:bg-slate-800 text-white"
            : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        <Bell size={17} />

        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div
          className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl overflow-hidden z-50
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

            <span className="text-xs text-indigo-500">
              {notifications.length} New
            </span>
          </div>

          {notifications.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">
              No Notifications
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`group relative p-4 border-b transition-all
                  ${
                    theme === "dark"
                      ? "border-slate-700/10 hover:bg-slate-800/20"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <button
                    onClick={() =>
                      removeNotification(
                        item.id
                      )
                    }
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-slate-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>

                  <h4
                    className={`font-medium text-sm mb-1
                    ${
                      theme === "dark"
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-400">
                    {item.message}
                  </p>

                  <span className="text-[10px] text-slate-500 mt-2 block">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>

    {/* User Menu */}
    <div className="relative">
      <button
        onClick={() =>
          setShowMenu(!showMenu)
        }
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
          {data?.Name?.charAt(0) || "E"}
        </div>

        <ChevronDown size={14} />
      </button>

      {showMenu && (
        <div
          className={`absolute right-0 mt-2 w-44 rounded-xl p-2 shadow-xl
          ${
            theme === "dark"
              ? "bg-[#13162A] border border-[#1E2235]"
              : "bg-white border"
          }`}
        >
          <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-slate-700/20">
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
