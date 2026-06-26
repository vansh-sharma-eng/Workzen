import React from "react";
import { Calendar, MessageCircle, Coffee, AlertTriangle } from "lucide-react";
import { wellnessAlerts } from "../../../data/HrData/wellnessAlerts";
import RiskBadge from "./RiskBadge";

const WellnessAlerts = () => {
  return (
    <div className="bg-[#151822] border border-[#1e2333] rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">Wellness Alerts</h2>
          <p className="text-sm text-gray-400 mt-1">Employees requiring HR attention</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2">
          <AlertTriangle size={15} className="text-red-400 shrink-0" />
          <span className="text-red-400 text-sm font-semibold whitespace-nowrap">
            {wellnessAlerts.length} Active Alerts
          </span>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {wellnessAlerts.map((employee) => (
          <div
            key={employee.id}
            className="bg-[#10141f] border border-[#1e2333] rounded-2xl p-4 flex flex-col gap-0 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300"
          >

            {/* Top Row: Avatar + Info + Risk Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3 items-start min-w-0">
                <div
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-white text-xs"
                  style={{ background: employee.avatarColor }}
                >
                  {employee.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {employee.employee}
                  </h3>
                  <p className="text-xs text-gray-400">{employee.department}</p>
                  <p className="text-[10px] w-57 text-red-400 mt-1 leading-relaxed">
                    {employee.message}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-xs">
                <RiskBadge risk={employee.risk} />
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-[#151822] border border-[#1e2333] rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-400">Mood</p>
                <h4 className="text-xs text-white font-semibold mt-1 truncate">{employee.mood}</h4>
              </div>
              <div className="bg-[#151822] border border-[#1e2333] rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-400">Days</p>
                <h4 className="text-xs text-white font-semibold mt-1">{employee.streak}</h4>
              </div>
              <div className="bg-[#151822] border border-[#1e2333] rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-400">Manager</p>
                <h4 className="text-xs text-white font-semibold mt-1 truncate" title={employee.manager}>
                  {employee.manager}
                </h4>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button className="flex items-center justify-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2 text-xs font-medium transition">
                <Calendar size={13} />
                1:1
              </button>
              <button className="flex items-center justify-center gap-1 rounded-lg border border-[#1e2333] bg-[#151822] hover:border-blue-500 text-gray-300 py-2 text-xs transition">
                <MessageCircle size={13} />
                Message
              </button>
              <button className="flex items-center justify-center gap-1 rounded-lg border border-[#1e2333] bg-[#151822] hover:border-orange-500 text-gray-300 py-2 text-xs transition">
                <Coffee size={13} />
                Break
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default WellnessAlerts;