import React from "react";
import { Upload } from "lucide-react";
import { companyDocuments} from "../../../data/HrData/documentsData";
import CompanyDocumentCard from "./CompanyDocumentCard";

const CompanyDocuments = () => {
  return (
    <div className="mt-8 bg-[#14151c] border border-[#272727] rounded-xl p-7">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-white">
            Company Documents
          </h2>

          <p className="text-gray-400 text-xs">
            HR policies, compliance docs, templates
          </p>
        </div>

        <button className="px-6 h-10 rounded-xl border border-[#272727] text-white flex items-center gap-3 hover:border-indigo-500">
          <Upload size={16} />
          Upload
        </button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {companyDocuments.map((item) => (
          <CompanyDocumentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CompanyDocuments;