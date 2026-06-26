import React from "react";
import EmployeeRow from "./EmployeeRow";
import { employeeDocuments } from "../../../data/HrData/documentsData";

const EmployeeDocuments = () => {
  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-xl overflow-hidden">
      <div className="p-7">
        <h2 className="text-xl font-bold text-white">
          All Employee Documents
        </h2>

        <p className="text-gray-400 text-sm">
          5 documents across 5 employees
        </p>
      </div>

      {employeeDocuments.map((employee) => (
        <EmployeeRow key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeDocuments;