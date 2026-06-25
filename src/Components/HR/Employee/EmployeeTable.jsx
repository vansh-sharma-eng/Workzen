import React from "react";
import EmployeeRow from "./EmployeeRow";
import { employees } from "../../../data/HrData/employeeData";

const EmployeeTable = () => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md overflow-hidden">

      <div className="px-6 py-5 border-b border-[#1A2035] flex items-center justify-between">
        <div>
          <h2 className="text-md font-semibold text-white">
            Employee Directory
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            {employees.length} Employees
          </p>
        </div>

        <button className="text-sm text-indigo-400 hover:text-indigo-300">
          View All
        </button>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#171A27] border-b border-[#1A2035]">
            <tr>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                Employee
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                Department
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                Join Date
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-400">
                Tasks
              </th>

              <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;