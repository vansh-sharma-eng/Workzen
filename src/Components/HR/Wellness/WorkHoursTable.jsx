import React from "react";
import { Clock3, ArrowRight } from "lucide-react";
import { workHoursData, riskColors } from "../../../data/HrData/workHoursData";

const WorkHoursTable = () => {
  return (
    <div className="bg-[#151822] border border-[#1e2333] rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2333]">
        <div>
          <h2 className="text-lg font-semibold text-white">Work Hours Tracking</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Monitor overtime and burnout risk by department
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-1.5">
          <Clock3 size={14} className="text-blue-400" />
          <span className="text-sm text-blue-400 font-medium">This Week</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-[#10141f]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Avg Hours / Day
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Overtime Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Risk
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1e2333]">
            {workHoursData.map((item) => {
              const risk = riskColors[item.risk];
              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#10141f] transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">
                      {item.department}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{item.avgHours} hrs</span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{item.overtimeDays} days</span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${risk.bg} ${risk.text}`}
                    >
                      {item.risk}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-1.5 text-xs font-medium text-white transition-colors duration-150 whitespace-nowrap">
                      {item.action}
                      <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[#1e2333] px-6 py-4">
        <span className="text-sm text-gray-400">
          Showing {workHoursData.length} departments
        </span>
        <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View Full Report
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};

export default WorkHoursTable;