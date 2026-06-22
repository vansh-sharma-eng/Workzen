import React from "react";

const WeeklyGlance = () => {
  const weekData = [
    {
      day: "Mon",
      color: "bg-green-500",
      icon: "✓",
    },
    {
      day: "Tue",
      color: "bg-green-500",
      icon: "✓",
    },
    {
      day: "Wed",
      color: "bg-green-500",
      icon: "✓",
    },
    {
      day: "Thu",
      color: "bg-yellow-500",
      icon: "✓",
    },
    {
      day: "Fri",
      color: "bg-gray-300",
      icon: "",
    },
  ];

  return (
    <div className=" bg-[#10111C] border border-[#1E2235] rounded-md p-6  h-auto w-109 ml-15">
      <h2 className="text-white text-xl font-bold mb-8">
        This Week at a Glance
      </h2>

      <div className="flex justify-between mb-14">
        {weekData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-gray-500">
              {item.day}
            </span>

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${item.color}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1f222985] border border-gray-800 rounded-md p-8 text-center">
        <p className="text-gray-500 text-md leading-relaxed">
          "Success is not final, failure is not fatal:
          it is the courage to continue that counts."
        </p>

        <p className="text-gray-500 mt-4 text-lg">
          — Winston Churchill
        </p>
      </div>
    </div>
  );
};

export default WeeklyGlance;