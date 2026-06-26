import React from "react";

const AttendanceRow = ({ employee }) => {
  const getBadge = (status) => {
    switch (status) {
      case "Present":
        return "bg-neutral-800 text-gray-300";

      case "WFH":
        return "bg-blue-950 text-blue-400";

      case "Absent":
        return "bg-neutral-800 text-gray-400";

      default:
        return "bg-neutral-800 text-gray-300";
    }
  };

  return (
    <tr className=" bg-[#13141F] border-b border-[#1A2035] hover:bg-[#171823] transition">
    

      <td className="px-6 py-2 ">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 text-[10px] rounded-full flex items-center justify-center text-white font-semibold"
            style={{
              background: employee.avatarColor,
            }}
          >
            {employee.initials}
          </div>

          <span className="text-white text-[13px] font-medium">
            {employee.name}
          </span>
        </div>
      </td>

   
      <td className="px-6 py-2 text-gray-400 text-md">
        {employee.department}
      </td>

      {/* Today */}

      <td className="px-6 py-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getBadge(
            employee.today
          )}`}
        >
          {employee.today}
        </span>
      </td>

      

      <td className="px-6 py-2">
        <div className="flex items-center gap-3">
          <div className="w-20 h-1 rounded-full bg-[#13141F] overflow-hidden">
            <div
              className="bg-white h-full rounded-full text-center"
              style={{
                width: `${employee.weekly}%`,
              }}
            />
          </div>

          <span className="text-white text-xs font-medium text-center">
            {employee.weekly}%
          </span>
        </div>
      </td>


      <td className="px-15 py-2  text-white font-medium text-sm">
        {employee.avgHours}
      </td>
    </tr>
  );
};

export default AttendanceRow;