// src/Components/Payroll/TopEarners.jsx

import React from "react";
import { Download } from "lucide-react";

const TopEarners = ({ earners }) => {
  return (
    <div className="border border-[#1E2235] bg-[#10111C] rounded-md overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-[#1A2138]">
        <h2 className="text-white text-sm font-bold">
          Top Earners
        </h2>

        <button className="text-indigo-400 text-xs">
          View all
        </button>
      </div>

      {earners.map((employee, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row lg:items-center justify-between p-3 border-b border-[#1A2138]"
        >
          <div className="flex items-center gap-5">
            <h3 className="text-gray-400 text-md w-8">
              {employee.rank}
            </h3>

            <div className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 font-semibold text-xs flex items-center justify-center">
              {employee.initials}
            </div>

            <div>
              <h3 className="text-white text-sm font-semibold">
                {employee.name}
              </h3>

              <p className="text-gray-400 text-xs">
                {employee.role} • {employee.dept}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 lg:mt-0">
            <div className="text-right">
              <h2 className="text-white text-sm font-bold">
                {employee.salary}
              </h2>

              <p className="text-gray-400 text-[10px]">
                Net / {employee.ctc} CTC
              </p>
            </div>

            <button className="border border-[#2A314D] px-4 py-1 rounded-md text-xs text-white flex items-center gap-2">
              <Download size={13} />
              Slip
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopEarners;