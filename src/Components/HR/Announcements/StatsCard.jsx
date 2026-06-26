import React from "react";

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  bgColor,
}) => {
  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-xl  w-full p-3 hover:border-gray-500 transition-all duration-300">
      <div className="flex items-start justify-between">
        
        <div>
        <div className="flex gap-3">
                <div
          className={`w-8 h-8 rounded-md flex items-center justify-center ${bgColor}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
          <p className="text-sm mt-2 text-gray-400">{title}</p>

        </div>
        <div className="ml-2">
             <h2 className="text-2xl  font-bold text-white mt-2">
            {value}
          </h2>

          <p className="text-xs text-gray-500 ">
            {subtitle}
          </p>
        </div>
        </div>

   
        
      </div>
    </div>
  );
};

export default StatsCard;