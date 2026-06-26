import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const PreferenceCard = () => {
  const [preferences, setPreferences] = useState({
    darkMode: true,
    emailNotifications: true,
    leaveAlerts: false,
    wellnessAlerts: true,
  });

  const toggleSetting = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settings = [
    {
      key: "darkMode",
      title: "Dark Mode",
      description: "Use dark theme throughout the dashboard.",
    },
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Receive email updates for important activities.",
    },
    {
      key: "leaveAlerts",
      title: "Leave Request Alerts",
      description: "Notify me whenever a leave request is submitted.",
    },
    {
      key: "wellnessAlerts",
      title: "Wellness Alerts",
      description: "Receive employee wellness and burnout alerts.",
    },
  ];

  return (
    <div className="p-5">

      {/* Heading */}

      <div className="mb-8">
        <h2 className="text-md font-bold text-white">
          Preferences
        </h2>

        <p className="text-gray-400 text-sm">
          Customize your HR dashboard experience
        </p>
      </div>

    
      <div className="space-y-6">

        {settings.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between bg-[#262b36] border border-[#343948] rounded-xl px-6 py-3"
          >
            <div>
              <h3 className="text-md font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-gray-400 text-xs ">
                {item.description}
              </p>
            </div>

            <ToggleSwitch
              enabled={preferences[item.key]}
              onChange={() => toggleSetting(item.key)}
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default PreferenceCard;