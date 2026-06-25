import React from "react";
import {
  CalendarClock,
  HeartPulse,
  ShieldAlert,
  Check,
  X,
} from "lucide-react";
import { pendingActions } from "../../../data/HrData/HrdashboardData";
const PendingActions = () => {
  const getIcon = (type) => {
    switch (type) {
      case "leave":
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-500/20  mt-2 flex items-center justify-center">
            <CalendarClock className="text-amber-400" size={14} />
          </div>
        );

      case "alert":
        return (
          <div className="w-8 h-8 rounded-lg bg-red-500/20 mt-2 flex items-center justify-center">
            <HeartPulse className="text-red-400" size={16} />
          </div>
        );

      case "probation":
        return (
          <div className="w-8 h-8 rounded-lg mt-2 bg-indigo-500/20 flex items-center justify-center">
            <ShieldAlert className="text-indigo-400" size={16} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md p-4 h-110">
 
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-md font-semibold text-white">
            Pending Actions
          </h2>

          <p className="text-gray-400 text-xs ">
            Items that require HR attention
          </p>
        </div>

        <span className="px-2 py-1 rounded-full bg-indigo-600 text-xs font-medium">
          {pendingActions.length}
        </span>
      </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
        {pendingActions.map((item) => (
          <div
            key={item.id}
            className="bg-[#171A27] border border-[#22263C] rounded-lg px-4 py-2 h-20 hover:border-indigo-500 transition-all"
          >
            <div className="flex justify-between">
              <div className="flex gap-4">
                {getIcon(item.type)}

                <div>
                  <h4 className="font-semibold text-white mt-1 text-[13px]">
                    {item.employee}
                  </h4>

                  <p className="text-gray-300 text-xs ">
                    {item.title}
                  </p>

                  {item.date && (
                    <p className="text-gray-500 text-xs ">
                      {item.date}
                      {item.duration && ` • ${item.duration}`}
                    </p>
                  )}

                  {item.description && (
                    <p className="text-gray-500 text-xs mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

            
              {item.type === "leave" && (
                <div className="flex gap-3 mt-1 mr-1">
                  <button className="w-7 h-7 rounded-lg bg-green-600 hover:bg-green-700 flex items-center justify-center">
                    <Check size={14} />
                  </button>

                  <button className="w-7 h-7 rounded-lg bg-red-600 hover:bg-red-700 flex items-center justify-center">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingActions;