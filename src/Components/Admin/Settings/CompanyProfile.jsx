// src/Components/Settings/CompanyProfile.jsx

import React, { useState } from "react";
import { Building2 } from "lucide-react";

const CompanyProfile = ({sidebarCollapsed}) => {
  const [company, setCompany] = useState({
    name: "TechCorp Inc.",
    industry: "Information Technology",
    founded: "2018",
    location: "Mumbai, Maharashtra",
    strength: "158",
  });

  const handleChange = (field, value) => {
    setCompany((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={`
      transition-all duration-300
      ${
        sidebarCollapsed
          ? "ml-0 w-[calc(100%)] "
          : "ml-0 w-[calc(100%)]"
      }
    `}>
    <div className="border border-[#1E2235] bg-[#10111C]  rounded-md overflow-hidden">
      <div className="flex items-center gap-4 p-2 border-b border-[#1A2138]">
        <div className="w-8 h-8 rounded-md bg-indigo-950 flex items-center justify-center">
          <Building2 className="text-indigo-500" size={14} />
        </div>

        <h3 className="text-white text-sm  font-bold">
          Company Profile
        </h3>
      </div>

      {[
        ["Company Name", "name"],
        ["Industry", "industry"],
        ["Founded", "founded"],
        ["HQ Location", "location"],
        ["Total Strength", "strength"],
      ].map(([label, key]) => (
        <div
          key={key}
          className="grid grid-cols-2 px-3 mt-3 border-b border-[#1A2138]"
        >
          <div className=" text-gray-400 text-sm ">
            {label}
          </div>

          <input
            value={company[key]}
            onChange={(e) =>
              handleChange(key, e.target.value)
            }
            className="border border-[#1E2235] bg-[#151828] w-80   rounded-md px-5 py-1 mb-2 ml-40 text-center text-white outline-none"
          />
        </div>
      ))}

      <div className="p-3  flex justify-end">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-md font-semibold text-sm">
          Save Changes
        </button>
      </div>
    </div>
    </div>
  );
};

export default CompanyProfile;