import React from "react";
import {
  IndianRupee,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";

const PayrollStats = ({ stats }) => {
  const icons = [
    <IndianRupee size={15} />,
    <TrendingUp size={15} />,
    <Users size={15}/>,
    <FileText size={15} />,
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
      {stats.map((item, index) => (
        <div
          key={index}
          className="border border-[#1E2235] bg-[#10111C] rounded-md p-3"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-300 text-sm">
                {item.title}
              </h3>

              <h1 className="text-white text-sm font-bold mt-2">
                {item.value}
              </h1>

              <p className="text-gray-400 mt-2 text-sm">
                {item.subtitle}
              </p>
            </div>

            <div
              className={`w-10 h-10 rounded-xl bg-[#141B33] flex items-center justify-center ${item.color}`}
            >
              {icons[index]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayrollStats;