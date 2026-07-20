import React, { useState } from "react";

// Everything except UI preferences (theme, notification toggles) and the Company Profile
// card is real, backend-persisted data (employees, attendance, leave, WFH requests, tasks,
// office locations). This button only ever touches what's still local-only, under the "wz_" prefix.
const LOCAL_DEMO_PREFIXES = ["wz_"];

const DangerZone = () => {
  const [done, setDone] = useState(false);

  const handleReset = () => {
    const confirmed = window.confirm(
      "This clears locally-stored settings in this browser (Company Profile, theme, and notification preferences). It will NOT delete any real employee, attendance, leave, WFH request, or task data — that all lives in the database. Continue?"
    );

    if (!confirmed) return;

    Object.keys(localStorage)
      .filter((k) => LOCAL_DEMO_PREFIXES.some((p) => k.startsWith(p)))
      .forEach((k) => localStorage.removeItem(k));

    setDone(true);
    setTimeout(() => window.location.reload(), 800);
  };

  return (
    <div className="border border-red-900 rounded-md overflow-hidden bg-[#10111C] ">
      <div className="p-3 border-b border-red-900">
        <h2 className="text-red-500 text-md font-bold">
          Danger Zone
        </h2>
      </div>

      <div className="p-4 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h3 className="text-white text-md font-semibold">
            Reset local preferences
          </h3>

          <p className="text-gray-400  text-xs mt-2 max-w-md">
            Clears locally-stored Company Profile and UI preferences (theme, notification toggles) in this browser.
            All real data — employees, attendance, leave, WFH requests, tasks, office locations — lives
            in the database and is untouched.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="border border-red-500 text-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-500 hover:text-white transition whitespace-nowrap"
        >
          {done ? "Reloading…" : "Reset Local Preferences"}
        </button>
      </div>
    </div>
  );
};

export default DangerZone;
