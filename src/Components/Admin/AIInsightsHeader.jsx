import { BrainCircuit } from "lucide-react";

const AIInsightsHeader = ({ sidebarCollapsed }) => {
  return (
    <div
      className={`rounded-md border mb-7 border-[#1E2235] bg-[#10111C] px-6 py-4 transition-all duration-300
        ${
          sidebarCollapsed
            ? "ml-1 w-[calc(100%)]"
            : "ml-0 w-[calc(100%)]"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#151B36]">
            <BrainCircuit size={14} className="text-indigo-400" />
          </div>

          <div>
            <h1 className="text-md font-semibold text-white">
              AI Insights Engine
            </h1>

            <p className="text-xs text-slate-400">
              Powered by ML models analyzing attendance, engagement,
              OKRs and mood data.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>

          <span className="text-[11px] font-medium text-green-600">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsHeader;