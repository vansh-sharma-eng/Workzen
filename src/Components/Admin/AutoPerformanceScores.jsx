import React from "react";
import { Sparkles } from "lucide-react";

const AutoPerformanceScores = ({sidebarCollapsed}) => {
  const employees = [
    {
      name: "Priya Mehta",
      score: 91,
      change: "+4",
      width: "91%",
      color: "bg-emerald-500",
      changeColor: "text-emerald-400",
    },
    {
      name: "Ananya Roy",
      score: 95,
      change: "+2",
      width: "95%",
      color: "bg-emerald-500",
      changeColor: "text-emerald-400",
    },
    {
      name: "Rahul Gupta",
      score: 67,
      change: "-8",
      width: "67%",
      color: "bg-red-500",
      changeColor: "text-red-400",
    },
    {
      name: "Vikram Patel",
      score: 74,
      change: "+1",
      width: "74%",
      color: "bg-emerald-500",
      changeColor: "text-emerald-400",
    },
  ];

  return (
    <div
      className={`rounded-md bg-[#10111C] border border-[#1E2235] p-5
      flex flex-col gap-4 h-[200px] overflow-y-auto transition-all duration-300
      ${
        sidebarCollapsed
          ? "-ml-1 w-[calc(118%)]"
          : "-ml-1 w-[calc(115%)]"
      }`}
     >

      <div className="flex items-center gap-2">
        <Sparkles size={15} className="text-indigo-400" />
        <h1 className="text-white text-sm font-semibold">
          Auto Performance Scores
        </h1>
      </div>

     
      <div className="flex flex-col gap-2">
        {employees.map((employee, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_140px_50px_40px] items-center "
          >
            <h2 className="text-white text-sm font-medium">
              {employee.name}
            </h2>

          
            <div className="h-1 bg-[#161c34]  rounded-full overflow-hidden">
              <div
                className={`h-full  rounded-full ${employee.color}`}
                style={{ width: employee.width }}
              />
            </div>

            <span className="text-white text-sm font-semibold text-right">
              {employee.score}
            </span>

            <span
              className={`text-sm font-medium text-right ${employee.changeColor}`}
            >
              {employee.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoPerformanceScores;