// src/Pages/PayrollPage.jsx

import React from "react";
import PayrollStats from "../../Components/Admin/Payroll/PayrollStats"
import PayrollTrend from "../../Components/Admin/Payroll/PayrollTrend"
import SalaryBreakdown from "../../Components/Admin/Payroll/SalaryBreakdown";
import TopEarners from "../../Components/Admin/Payroll/TopEarners";
const PayrollPage = ({sidebarCollapsed}) => {
  const payrollStats = [
    {
      title: "Monthly Payroll",
      value: "₹24.55L",
      subtitle: "June 2026",
      color: "text-indigo-400",
    },
    {
      title: "Avg. Salary",
      value: "₹1.55L",
      subtitle: "Per employee",
      color: "text-emerald-400",
    },
    {
      title: "Processed",
      value: "158",
      subtitle: "Employees this month",
      color: "text-yellow-400",
    },
    {
      title: "Payslips Sent",
      value: "156",
      subtitle: "2 pending download",
      color: "text-cyan-400",
    },
  ];

  const trendData = [
    { month: "Jan", payroll: 23.2 },
    { month: "Feb", payroll: 23.6 },
    { month: "Mar", payroll: 23.8 },
    { month: "Apr", payroll: 24.1 },
    { month: "May", payroll: 24.3 },
    { month: "Jun", payroll: 24.55 },
  ];

  const breakdownData = [
    {
      label: "Basic Salary",
      amount: "₹1580K",
      percent: 65,
      color: "bg-indigo-500",
    },
    {
      label: "HRA",
      amount: "₹474K",
      percent: 22,
      color: "bg-emerald-500",
    },
    {
      label: "Special Allowance",
      amount: "₹246K",
      percent: 12,
      color: "bg-yellow-500",
    },
    {
      label: "Medical",
      amount: "₹79K",
      percent: 3,
      color: "bg-cyan-500",
    },
    {
      label: "PF Deduction",
      amount: "-₹186K",
      percent: 8,
      color: "bg-red-500",
      negative: true,
    },
    {
      label: "TDS",
      amount: "-₹98K",
      percent: 4,
      color: "bg-pink-500",
      negative: true,
    },
  ];

  const earners = [
    {
      rank: "#1",
      initials: "RG",
      name: "Rahul Gupta",
      role: "Product Manager",
      dept: "Product",
      salary: "₹1,96,500",
      ctc: "₹25,20,000",
    },
    {
      rank: "#2",
      initials: "PM",
      name: "Priya Mehta",
      role: "Sr. Engineer",
      dept: "Engineering",
      salary: "₹1,72,500",
      ctc: "₹22,20,000",
    },
    {
      rank: "#3",
      initials: "AR",
      name: "Ananya Roy",
      role: "HR Manager",
      dept: "HR",
      salary: "₹1,58,200",
      ctc: "₹20,40,000",
    },
    {
      rank: "#4",
      initials: "SJ",
      name: "Saurabh Jain",
      role: "Finance Manager",
      dept: "Finance",
      salary: "₹1,68,000",
      ctc: "₹21,60,000",
    },
  ];

  return (
    <div className={`
      transition-all duration-300
      ${
        sidebarCollapsed
          ? "ml-16 w-[calc(116%)]"
          : "ml-54 w-[calc(102%)]"
      }
    `}>

    <div className="min-h-screen w-[82%]  mt-17 bg-[#050816] p-6">
      <PayrollStats stats={payrollStats} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mt-6">
        <PayrollTrend data={trendData} />
        <SalaryBreakdown data={breakdownData} />
      </div>

      <div className="mt-6">
        <TopEarners earners={earners} />
      </div>
    </div>
    </div>
  );
};

export default PayrollPage;