import React from "react";
import { Bell } from "lucide-react";
import { useUserSettings } from "../../../Utils/useUserSettings";

const NotificationPreferences = ({ data }) => {
  const { value: settings, update } = useUserSettings(`${data?.email || data?.id || "admin"}:notifications`, {
    leave: true,
    birthday: true,
    email: true,
  });

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`w-11 h-5 rounded-full transition ${
        checked
          ? "bg-indigo-500"
          : "bg-gray-600"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transition ${
          checked
            ? "translate-x-6"
            : "translate-x-0"
        }`}
      />
    </button>
  );

  const items = [
    ["Leave approval notifications", "leave"],
    ["Birthday & anniversary wishes", "birthday"],
    ["Email digest (daily)", "email"],
  ];

  return (
    <div className="border border-[#1E2235] bg-[#10111C]  rounded-md overflow-hidden">
      <div className="flex items-center gap-4 p-4 border-b border-[#1A2138]">
        <div className="w-8 h-8 bg-amber-950 rounded-md flex items-center justify-center">
          <Bell className="text-amber-400" size={15} />
        </div>

        <h2 className="text-white text-sm font-bold">
          Notification Preferences
        </h2>
      </div>

      {items.map(([label, key]) => (
        <div
          key={key}
          className="flex justify-between items-center p-3 border-b border-[#1E2235] bg-[#10111C] "
        >
          <span className="text-gray-400 text-sm">
            {label}
          </span>

          <Toggle
            checked={settings[key]}
            onChange={() => update({ [key]: !settings[key] })}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationPreferences;
