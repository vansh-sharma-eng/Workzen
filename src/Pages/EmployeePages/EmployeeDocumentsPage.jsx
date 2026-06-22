import React, { useState } from "react";
import DocumentCard from "../../Components/Employee/documents/DocumentCard";
import DocumentFilter from "../../Components/Employee/documents/DocumentFilter";
import UploadDocuments from "../../Components/Employee/documents/UploadDocuments";
import { documentsData } from "../../Components/Employee/documents/documentsData";

const EmployeeDocumentsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All Documents");

  const filteredDocuments =
    documentsData.filter((doc) => {
      const matchesSearch =
        doc.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Documents"
          ? true
          : doc.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <div className="h-auto p-2">
      <DocumentFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
          />
        ))}
      </div>

      <UploadDocuments />
    </div>
  );
};

export default EmployeeDocumentsPage;