import React from "react";
import { Eye, Pencil, Clock3 } from "lucide-react";

const AttendanceRow = ({ employee }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-500/15 text-green-400";

      case "Late":
        return "bg-yellow-500/15 text-yellow-400";

      case "Absent":
        return "bg-red-500/15 text-red-400";

      case "WFH":
        return "bg-indigo-500/15 text-indigo-400";

      default:
        return "bg-slate-500/15 text-slate-300";
    }
  };

  return (
    <tr className="border-b border-[#1A2035] hover:bg-[#171A27] transition-all">
      {/* Employee */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold"
            style={{
              backgroundColor: employee.avatarColor,
            }}
          >
            {employee.initials}
          </div>

          <div>
            <h3 className="text-white font-medium">
              {employee.name}
            </h3>

            <p className="text-xs text-gray-400">
              {employee.department}
            </p>
          </div>
        </div>
      </td>

      {/* Check In */}
      <td className="px-6 py-5 text-gray-300">
        {employee.checkIn}
      </td>

      {/* Check Out */}
      <td className="px-6 py-5 text-gray-300">
        {employee.checkOut}
      </td>

      {/* Working Hours */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <Clock3
            size={15}
            className="text-indigo-400"
          />

          <span className="text-white">
            {employee.hours}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
            employee.status
          )}`}
        >
          {employee.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-lg bg-[#171A27] hover:bg-[#1A2035] flex items-center justify-center transition-all">
            <Eye
              size={17}
              className="text-gray-400"
            />
          </button>

          <button className="w-9 h-9 rounded-lg bg-[#171A27] hover:bg-[#1A2035] flex items-center justify-center transition-all">
            <Pencil
              size={17}
              className="text-indigo-400"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AttendanceRow;