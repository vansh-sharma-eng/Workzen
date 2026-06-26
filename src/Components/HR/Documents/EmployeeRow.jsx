import React from "react";
import { ChevronRight } from "lucide-react";

const EmployeeRow = ({ employee }) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-[#272727] hover:bg-[#171821] transition">
      <div className="flex items-center gap-4">
        <div
          className={`w-8 h-8 rounded-full ${employee.color} flex items-center justify-center text-white text-sm font-semibold`}
        >
          {employee.initials}
        </div>

        <h3 className="text-white text-md font-medium">{employee.name}</h3>
      </div>

      <div className="flex items-center gap-5 text-gray-400 text-xs">
        <span>{employee.docs} docs</span>
        <ChevronRight size={16} />
      </div>
    </div>
  );
};

export default EmployeeRow;