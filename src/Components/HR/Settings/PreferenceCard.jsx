import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { useUserSettings } from "../../../Utils/useUserSettings";
import { useTheme } from "../../Context/ThemeContext";

const PreferenceCard = ({ data }) => {
  const { theme, toggleTheme } = useTheme();
  const { value: preferences, update } = useUserSettings(`${data?.email || data?.id}:prefs`, {
    emailNotifications: true,
    leaveAlerts: false,
  });

  const toggleSetting = (key) => update({ [key]: !preferences[key] });

  const settings = [
    {
      key: "darkMode",
      title: "Dark Mode",
      description: "Use dark theme throughout the dashboard.",
      enabled: theme === "dark",
      onChange: toggleTheme,
    },
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Receive email updates for important activities.",
      enabled: preferences.emailNotifications,
      onChange: () => toggleSetting("emailNotifications"),
    },
    {
      key: "leaveAlerts",
      title: "Leave Request Alerts",
      description: "Notify me whenever a leave request is submitted.",
      enabled: preferences.leaveAlerts,
      onChange: () => toggleSetting("leaveAlerts"),
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
              enabled={item.enabled}
              onChange={item.onChange}
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default PreferenceCard;
