import React from "react";
import {
  Eye,
  Pencil,
  Send,
} from "lucide-react";

const EmployeeRow = ({ employee }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/15 text-emerald-400";

      case "On Leave":
        return "bg-amber-500/15 text-amber-400";

      case "Inactive":
        return "bg-red-500/15 text-red-400";

      default:
        return "bg-slate-500/15 text-slate-300";
    }
  };

  return (
    <tr className="border-b border-[#1A2035] hover:bg-[#171A27] transition-all">
      
      <td className="px-4 py-1">
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 text-xs rounded-full flex items-center justify-center text-white font-semibold"
            style={{
              backgroundColor: employee.avatarColor,
            }}
          >
            {employee.initials}
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold">
              {employee.name}
            </h3>

            <p className="text-gray-400 text-xs">
              {employee.email}
            </p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-2  text-sm py-2 text-gray-300">
        {employee.role}
      </td>

      {/* Department */}
      <td className="px-8 py-2">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: employee.departmentColor,
            }}
          />

          <span className="text-white text-sm">
            {employee.department}
          </span>
        </div>
      </td>


      <td className="px-6 py-2">
        <span
          className={`px-2 py-1 text-xs rounded-full  font-medium ${getStatusStyle(
            employee.status
          )}`}
        >
          {employee.status}
        </span>
      </td>

      <td className="px-5 py-2 text-gray-300 text-sm">
        {employee.joinDate}
      </td>

       <td className="px-9 py-2">
        <span className="text-white font-semibold text-sm">
          {employee.tasks}
        </span>
      </td>

      
      <td className="px-2 py-4">
        <div className="flex items-center">
          <button className="w-9 h-9 rounded-lg hover:bg-[#1A2035] flex items-center justify-center transition">
            <Eye
              size={14}
              className="text-gray-400 hover:text-white"
            />
          </button>

          <button className="w-9 h-9 rounded-lg hover:bg-[#1A2035] flex items-center justify-center transition">
            <Pencil
              size={14}
              className="text-gray-400 hover:text-indigo-400"
            />
          </button>

          <button className="w-9 h-9 rounded-lg hover:bg-[#1A2035] flex items-center justify-center transition">
            <Send
              size={14}
              className="text-gray-400 hover:text-cyan-400"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;