import React, { useState } from "react";
import { Bell } from "lucide-react";

const NotificationPreferences = () => {
  const [settings, setSettings] = useState({
    leave: true,
    payroll: true,
    attrition: true,
    birthday: true,
    whatsapp: false,
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
    ["Payroll processing alerts", "payroll"],
    ["AI attrition risk alerts", "attrition"],
    ["Birthday & anniversary wishes", "birthday"],
    ["WhatsApp notifications", "whatsapp"],
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
            onChange={() =>
              setSettings((prev) => ({
                ...prev,
                [key]: !prev[key],
              }))
            }
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationPreferences;