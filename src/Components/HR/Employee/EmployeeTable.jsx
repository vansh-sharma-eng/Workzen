import React from "react";
import { Loader2 } from "lucide-react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employees, loading, error, totalCount, onView, onEdit, onResetPassword }) => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-md overflow-hidden">
      <div className="px-6 py-5 border-b border-[#1A2035] flex items-center justify-between">
        <div>
          <h2 className="text-md font-semibold text-white">Employee Directory</h2>
          <p className="text-xs text-gray-400 mt-1">{totalCount} Employees on your team</p>
        </div>
      </div>

      {error && (
        <div className="px-6 py-4 text-sm text-red-400 bg-red-500/10 border-b border-red-500/20">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#171A27] border-b border-[#1A2035]">
            <tr>
              {["Employee", "Title", "Department", "Status", "Join Date", "Tasks"].map((h) => (
                <th key={h} className="px-6 py-4 text-left text-xs uppercase tracking-wider text-gray-400">{h}</th>
              ))}
              <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-gray-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-14 text-center text-gray-400 text-sm">
                  <span className="inline-flex items-center gap-2"><Loader2 size={15} className="animate-spin" /> Loading your team…</span>
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-14 text-center text-gray-400 text-sm">
                  No employees on your team yet. Add one to get started.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <EmployeeRow key={employee.id} employee={employee} onView={onView} onEdit={onEdit} onResetPassword={onResetPassword} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
