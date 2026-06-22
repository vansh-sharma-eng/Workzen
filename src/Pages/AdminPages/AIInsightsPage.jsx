import AIInsightsHeader from "../../Components/Admin/Others/AIInsightsHeader";
import AttritionRiskPrediction from "../../Components/Admin/Others/AttritionRiskPrediction";
import AutoPerformanceScores from "../../Components/Admin/Others/AutoPerformanceScores";
import LeavePredictions from "../../Components/Admin/Others/LeavePredictions";
const AIInsights = ({sidebarCollapsed}) => {
  return (
    <div className={`
        mt-15
        transition-all
        duration-300
        ${
          sidebarCollapsed
            ? "ml-17 w-[calc(100%-4rem)]"
            : "ml-57 w-[calc(100%-14rem)]"
        }
      `}>
      <AIInsightsHeader sidebarCollapsed={sidebarCollapsed} />

      <div className="flex gap-4 w-[97.5%] px-5 -mt-2 ">
    <AttritionRiskPrediction  sidebarCollapsed={sidebarCollapsed}/>
<div className="flex flex-col gap-3">
        <LeavePredictions  sidebarCollapsed={sidebarCollapsed}/>
        <AutoPerformanceScores  sidebarCollapsed={sidebarCollapsed}/>
</div>
      </div>
    </div>
  );
};

export default AIInsights;