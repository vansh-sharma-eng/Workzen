// src/Pages/DocumentsPage.jsx

import React from "react";
import DocumentStats from "../../Components/Admin/Documents/DocumentStats";
import DocumentActions from "../../Components/Admin/Documents/DocumentActions";
import RecentDocuments from "../../Components/Admin/Documents/RecentDocuments";

const DocumentsPage = ({sidebarCollapsed}) => {
  const stats = [
    {
      title: "Total Documents",
      value: "1,284",
      color: "text-indigo-500",
      icon: "file",
    },
    {
      title: "Generated This Month",
      value: "38",
      color: "text-emerald-400",
      icon: "generate",
    },
    {
      title: "Pending Signature",
      value: "7",
      color: "text-amber-400",
      icon: "shield",
    },
    {
      title: "Uploaded by Employees",
      value: "156",
      color: "text-cyan-400",
      icon: "upload",
    },
  ];

  const documents = [
    {
      name: "Offer Letter — Kartik Shah.pdf",
      type: "Offer Letter",
      size: "184 KB",
      department: "Engineering",
      date: "Jun 5, 2026",
      color: "indigo",
    },
    {
      name: "Increment Letter — Priya Mehta.pdf",
      type: "Increment Letter",
      size: "212 KB",
      department: "Engineering",
      date: "Jun 1, 2026",
      color: "emerald",
    },
    {
      name: "Salary Slip — May 2026 — All.zip",
      type: "Salary Slip",
      size: "4.2 MB",
      department: "All",
      date: "Jun 1, 2026",
      color: "amber",
    },
    {
      name: "Aadhaar Card — Meera Nair.pdf",
      type: "ID Proof",
      size: "1.1 MB",
      department: "Analytics",
      date: "Apr 15, 2026",
      color: "cyan",
    },
    {
      name: "Experience Certificate — Ravi Shankar.pdf",
      type: "Certificate",
      size: "340 KB",
      department: "Sales",
      date: "Mar 20, 2026",
      color: "pink",
    },
  ];

  return (
     <div className={`
      transition-all duration-300
      ${
        sidebarCollapsed
          ? "ml-16 w-[calc(114%)]"
          : "ml-54 w-[calc(100%)]"
      }
    `}>
      
    <div className="min-h-screen w-[82.5%]  mt-16 bg-[#050816] p-6">
      <DocumentStats stats={stats} />

      <DocumentActions />

      <RecentDocuments documents={documents} />
    </div>
  </div>
  );
};

export default DocumentsPage;