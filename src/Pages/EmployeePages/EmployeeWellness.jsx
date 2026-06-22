// src/Pages/EmployeeWellness.jsx

import MoodStats from "../../Components/Admin/Wellness/MoodStats";
import WeeklyMoodTrend from "../../Components/Admin/Wellness/WeeklyMoodTrend";
import AIWellnessSuggestions from "../../Components/Admin/Wellness/AIWellnessSuggestions";
import StressAlerts from "../../Components/Admin/Wellness/StressAlerts";
const EmployeeWellness = ({sidebarCollapsed}) => {
  return (
    <div className={`
      mt-23 
      transition-all duration-300
      ${
        sidebarCollapsed
          ? "ml-23 w-[calc(100%-4rem)]"
          : "ml-60 w-[calc(100%-14rem)]"
      }
    `}
  > 
     <div className="w-[96%]"> <MoodStats sidebarCollapsed={sidebarCollapsed}
        /></div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-4">
        <WeeklyMoodTrend />
        <AIWellnessSuggestions
          sidebarCollapsed={sidebarCollapsed} />
      </div>

      <div className="mt-6">
        <StressAlerts
        sidebarCollapsed={sidebarCollapsed} />
      
      </div>
    </div>
  );
};

export default EmployeeWellness;