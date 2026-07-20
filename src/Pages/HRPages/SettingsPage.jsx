import React from "react";
import PreferenceCard from "../../Components/Settings/PreferenceCard";
import AccessScopeCard from "../../Components/Settings/AccessScopeCard";

const SettingsPage = ({ data }) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl space-y-6">
        <div className="bg-[#10111C] border border-[#1E2235] rounded-md">
          <PreferenceCard data={data} role="hr" />
        </div>
        <div className="bg-[#10111C] border border-[#1E2235] rounded-md">
          <AccessScopeCard role="hr" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
