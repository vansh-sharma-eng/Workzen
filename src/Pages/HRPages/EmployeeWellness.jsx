import React from "react";

import MoodSummary from "../../Components/HR/Wellness/MoodSummary";
import MoodTrendChart from "../../Components/HR/Wellness/MoodTrendChart";
import DepartmentMoodChart from "../../Components/HR/Wellness/DepartmentMoodChart";
import WellnessAlerts from "../../Components/HR/Wellness/WellnessAlerts";
import WorkHoursTable from "../../Components/HR/Wellness/WorkHoursTable";
import WellnessTip from "../../Components/HR/Wellness/WellnessTip";

const EmployeeWellness = () => {
  return (
    <div className="space-y-6">

      {/* Mood Summary */}
      <MoodSummary />

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-[#151822] border border-[#1e2333] rounded-2xl p-6">
          <MoodTrendChart />
        </div>

        <div className="bg-[#151822] border border-[#1e2333] rounded-2xl p-6">
          <DepartmentMoodChart />
        </div>

      </div>

      {/* Alerts */}
      <WellnessAlerts />

      {/* Bottom */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <WorkHoursTable />
        </div>

        <div>
          <WellnessTip />
        </div>

      </div>

    </div>
  );
};

export default EmployeeWellness;