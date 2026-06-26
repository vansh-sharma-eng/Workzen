import React from "react";
import DocumentsHeader from "../../Components/HR/Documents/DocumentsHeader";
import EmployeeDocuments from "../../components/HR/Documents/EmployeeDocuments";
import CompanyDocuments from "../../components/HR/Documents/CompanyDocuments";

const DocumentsPage = () => {
  return (
    <div className="h-full p-5">
      <DocumentsHeader />

      <EmployeeDocuments />

      <CompanyDocuments />
    </div>
  );
};

export default DocumentsPage;