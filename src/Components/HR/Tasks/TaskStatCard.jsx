import React from "react";

const TaskStatCard = ({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  bgColor,
}) => {
  const Icon = icon;
  return (
    <div className="bg-[#14151c] border border-[#272727] rounded-xl p-4 hover:border-gray-500 transition-all duration-300">
      <div className="flex items-start gap-5">
      
        <div
          className={`w-10 h-10  rounded-md flex items-center justify-center ${bgColor}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>

        
        <div className="flex-1">
          <p className="text-gray-400 text-md">{title}</p>

          <h2 className="text-white text-2xl font-bold ">
            {value}
          </h2>

          <p className="text-gray-500 text-xs ">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskStatCard;