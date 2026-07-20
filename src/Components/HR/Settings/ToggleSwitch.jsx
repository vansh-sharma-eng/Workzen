import React from "react";

const ToggleSwitch = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-12 items-center rounded-full transition-all duration-300 ${
        enabled ? "bg-indigo-600" : "bg-[#3a4150]"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 ml-1 transform rounded-full bg-white shadow-lg transition-all duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;