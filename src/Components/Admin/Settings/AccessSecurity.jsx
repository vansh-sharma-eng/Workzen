// src/Components/Settings/AccessSecurity.jsx

import React from "react";
import { Shield } from "lucide-react";

const AccessSecurity = () => {
  const data = [
    ["Authentication", "JWT + Spring Security"],
    ["Session Timeout", "8 hours"],
    ["2FA", "Enabled"],
    ["Audit Log", "Active — 30 day retention"],
    ["Last Login", "Jun 5, 2026 — 09:02 AM"],
  ];

  return (
    <div className="border border-[#1E2235] bg-[#10111C]  rounded-md overflow-hidden">
      <div className="flex items-center gap-4 p-3 border-b border-[#1A2138]">
        <div className="w-8 h-8 rounded-md bg-red-950 flex items-center justify-center">
          <Shield className="text-red-400" size={14} />
        </div>

        <h2 className="text-white text-md font-bold">
          Access & Security
        </h2>
      </div>

      {data.map(([label, value]) => (
        <div
          key={label}
          className="grid grid-cols-2 p-2 border-b border-[#1A2138]"
        >
          <span className="text-gray-400 text-sm px-3">
            {label}
          </span>

          <span className="text-white text-right font-mono text-md mr-4">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AccessSecurity;