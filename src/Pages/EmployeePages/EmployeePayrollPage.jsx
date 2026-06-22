import React, { useState } from "react";
import PayrollTabs from "../../Components/Employee/Payroll/PayrollTabs";
import PayslipView from "../../Components/Employee/Payroll/PayslipView";
import SalaryBreakdown from "../../Components/Admin/Payroll/SalaryBreakdown";
import PayrollHistory from "../../Components/Employee/Payroll/PayrollHistory";
const EmployeePayrollPage = () => {
  const [activeTab, setActiveTab] =
    useState("Payslip");

  return (
    <div className="min-h-screen p-1">
      <PayrollTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "Payslip" && (
        <PayslipView />
      )}

      {activeTab ===
        "Salary Breakdown" && (
        <SalaryBreakdown />
      )}

      {activeTab === "History" && (
        <PayrollHistory />
      )}
    </div>
  );
};

export default EmployeePayrollPage;