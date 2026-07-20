// src/Components/Settings/CompanyProfile.jsx

import React, { useContext } from "react";
import { Building2, Check } from "lucide-react";
import { useLocalTable } from "../../../Utils/useLocalTable";
import { AuthContext } from "../../Context/AuthProvider";

const DEFAULT_COMPANY = {
  name: "TechCorp Inc.",
  industry: "Information Technology",
  founded: "2018",
  location: "Mumbai, Maharashtra",
};

const CompanyProfile = ({ sidebarCollapsed }) => {
  const { userData } = useContext(AuthContext);
  const [company, setCompany] = useLocalTable("wz_company_profile", DEFAULT_COMPANY);
  const [saved, setSaved] = React.useState(false);

  const handleChange = (field, value) => {
    setCompany((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const strength = (userData.employeesData || []).length;

  const fields = [
    ["Company Name", "name"],
    ["Industry", "industry"],
    ["Founded", "founded"],
    ["HQ Location", "location"],
  ];

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

      {fields.map(([label, key]) => (
        <div
          key={key}
          className="grid grid-cols-2 px-3 mt-3 border-b border-[#1A2138]"
        >
          <div className=" text-gray-400 text-sm ">
            {label}
          </div>

          <input
            value={company[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="border border-[#1E2235] bg-[#151828] w-80   rounded-md px-5 py-1 mb-2 ml-40 text-center text-white outline-none"
          />
        </div>
      ))}

      <div className="grid grid-cols-2 px-3 mt-3 border-b border-[#1A2138]">
        <div className="text-gray-400 text-sm">Total Strength</div>
        <div className="w-80 ml-40 py-1 mb-2 text-center text-white" title="Live count of registered employees — not editable here">
          {strength} (live)
        </div>
      </div>

      <div className="p-3 flex justify-end items-center gap-3">
        {saved && <span className="text-emerald-400 text-xs">Saved ✓</span>}
        <button
          onClick={() => setSaved(true)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-md font-semibold text-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
    </div>
  );
};

export default CompanyProfile;
