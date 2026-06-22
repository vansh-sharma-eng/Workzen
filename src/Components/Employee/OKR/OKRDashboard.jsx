import { useState } from "react";
import { okrData } from "./okrData";
import OKRCard from "./OKRCard";

const OKRDashboard = ({sidebarCollapsed}) => {
  const [quarter, setQuarter] = useState("Q2");

  const activeGoals = okrData.length;
  const completed = 2;

  const avg =
    Math.round(
      okrData.reduce(
        (acc, item) => acc + item.progress,
        0
      ) / okrData.length
    );

  return (
     <div className={`
      transition-all duration-300
      ${
        sidebarCollapsed
          ? "ml-16 w-[calc(116%)]"
          : "-ml-2 w-[calc(100%)]"
      }
    `}>
    <div className="h-auto p-2">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-white text-xl font-bold">
            My Objectives & Key Results
          </h1>

          <p className="text-[#7F8499] text-sm ">
            Track your goals and key results
          </p>
        </div>

        <div className="flex gap-4">
          {["Q1", "Q2", "Q3", "Q4"].map((q) => (
            <button
              key={q}
              onClick={() => setQuarter(q)}
              className={`w-8 h-8 rounded-full border text-xs font-semibold
              ${
                quarter === q
                  ? "bg-[#635BFF] text-white border-[#635BFF]"
                  : "bg-[#0F1328] border-[#252B45] text-white"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#10111C] border border-[#20263a]  rounded-md h-30 p-4">
          <p className="text-[#7F8499] text-md">
            Active Goals
          </p>

          <h2 className="text-white text-2xl font-bold mt-5">
            {activeGoals}
          </h2>
        </div>

        <div className="bg-[#10111C] border border-[#20263a] h-30  rounded-md p-4">
          <p className="text-[#7F8499] text-md">
            Completed
          </p>

          <h2 className="text-white text-2xl font-bold mt-5">
            {completed}
          </h2>
        </div>

        <div className="bg-[#10111C] border border-[#20263a] h-30  rounded-md p-4">
          <p className="text-[#7F8499] text-md">
            Avg Progress
          </p>

          <h2 className="text-white text-2xl font-bold mt-5">
            {avg}%
          </h2>
        </div>
      </div>

      <div className="space-y-8">
        {okrData.map((goal) => (
          <OKRCard
            key={goal.id}
            goal={goal}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default OKRDashboard;