import React from "react";

import ProfileCard from "../../components/HR/Settings/ProfileCard";
import PreferenceCard from "../../components/HR/Settings/PreferenceCard";
import AccessScopeCard from "../../components/HR/Settings/AccessScopeCard";

const Settings = () => {
  return (
    <div className="h-auto text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        <ProfileCard />

        
        <PreferenceCard />

       
        <AccessScopeCard />

      </div>
    </div>
  );
};

export default Settings;