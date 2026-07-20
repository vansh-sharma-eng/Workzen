import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const EmployeeAttendanceCard = ({ breakdown, loading }) => {
  const data = [
    { name: "Present", value: breakdown?.present || 0, color: "#22C55E" },
    { name: "Late", value: breakdown?.late || 0, color: "#F59E0B" },
    { name: "WFH", value: breakdown?.wfh || 0, color: "#6366F1" },
    { name: "On Leave", value: breakdown?.onLeave || 0, color: "#EC4899" },
    { name: "Absent", value: breakdown?.absent || 0, color: "#6B7280" },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md p-4 h-110 max-h-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-md font-semibold text-white">
            Attendance Snapshot
          </h2>
          <p className="text-gray-400 text-xs">
            Today's attendance overview
          </p>
        </div>
      </div>

      {loading ? (
        <div className="h-52 flex items-center justify-center text-slate-500 text-sm">Loading…</div>
      ) : total === 0 ? (
        <div className="h-52 flex items-center justify-center text-slate-500 text-sm text-center px-6">
          Nobody's marked or punched in yet today.
        </div>
      ) : (
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#13141F",
                  border: "1px solid #1A2035",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="relative -mt-35 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="text-2xl font-bold text-white">{total}</h1>
            <p className="text-gray-400 text-xs">Employees</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mt-8">
        {data.filter((item) => item.value > 0).map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between bg-[#171A27] rounded-lg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-300">{item.name}</span>
            </div>
            <span className="font-semibold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeAttendanceCard;
