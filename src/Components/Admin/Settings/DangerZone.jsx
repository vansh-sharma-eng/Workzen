// src/Components/Settings/DangerZone.jsx

import React from "react";

const DangerZone = () => {
  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure? This action cannot be undone."
    );

    if (confirmed) {
      alert("Reset Started");
    }
  };

  return (
    <div className="border border-red-900 rounded-md overflow-hidden bg-[#10111C] ">
      <div className="p-3 border-b border-red-900">
        <h2 className="text-red-500 text-md font-bold">
          Danger Zone
        </h2>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="text-white text-md font-semibold">
            Reset all data
          </h3>

          <p className="text-gray-400  text-xs mt-2">
            This will permanently delete all employee
            and organization data.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="border border-red-500 text-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-500 hover:text-white transition"
        >
          Reset Data
        </button>
      </div>
    </div>
  );
};

export default DangerZone;