import React, { useState } from "react";
import {
  CalendarClock,
  Home,
  Check,
  X,
} from "lucide-react";
import leaveApi from "../../../api/leaveApi";
import wfhApi from "../../../api/wfhApi";

const PendingActions = ({ leaves = [], wfhRequests = [], loading, onDecided }) => {
  const [decidingKey, setDecidingKey] = useState(null);

  const items = [
    ...leaves.map((l) => ({
      key: `leave-${l.id}`,
      kind: "leave",
      id: l.id,
      employee: l.employeeName,
      title: `${l.leaveType || "Leave"} request`,
      date: l.startDate ? `${l.startDate} → ${l.endDate}` : null,
      description: l.reason,
    })),
    ...wfhRequests.map((w) => ({
      key: `wfh-${w.id}`,
      kind: "wfh",
      id: w.id,
      employee: w.employeeName,
      title: "Work From Home request",
      date: w.date,
      description: w.reason,
    })),
  ];

  const getIcon = (kind) => {
    if (kind === "wfh") {
      return (
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 mt-2 flex items-center justify-center">
          <Home className="text-indigo-400" size={14} />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-lg bg-amber-500/20 mt-2 flex items-center justify-center">
        <CalendarClock className="text-amber-400" size={14} />
      </div>
    );
  };

  const handleDecide = async (item, status) => {
    setDecidingKey(item.key);
    try {
      if (item.kind === "leave") {
        await leaveApi.decide(item.id, status);
      } else {
        await wfhApi.decide(item.id, status);
      }
      onDecided?.();
    } catch {
      // Swallow — the list will just still show the item, which is an honest reflection of "didn't work".
    } finally {
      setDecidingKey(null);
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
          {loading ? "…" : items.length}
        </span>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] text-slate-500 text-sm">
          Nothing pending — you're all caught up.
        </div>
      ) : (
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={item.key}
            className="bg-[#171A27] border border-[#22263C] rounded-lg px-4 py-2 min-h-20 hover:border-indigo-500 transition-all"
          >
            <div className="flex justify-between">
              <div className="flex gap-4">
                {getIcon(item.kind)}

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
                    </p>
                  )}

                  {item.description && (
                    <p className="text-gray-500 text-xs mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-1 mr-1">
                <button
                  onClick={() => handleDecide(item, "APPROVED")}
                  disabled={decidingKey === item.key}
                  className="w-7 h-7 rounded-lg bg-green-600 hover:bg-green-700 flex items-center justify-center disabled:opacity-50"
                >
                  <Check size={14} />
                </button>

                <button
                  onClick={() => handleDecide(item, "REJECTED")}
                  disabled={decidingKey === item.key}
                  className="w-7 h-7 rounded-lg bg-red-600 hover:bg-red-700 flex items-center justify-center disabled:opacity-50"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default PendingActions;
