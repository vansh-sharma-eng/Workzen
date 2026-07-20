import React from "react";

const colorClasses = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  green: "bg-emerald-500",
  blue: "bg-indigo-500",
  purple: "bg-violet-500",
};

const CalendarDay = ({ day, events = [] }) => {
  return (
    <div className="min-h-[22px] text-center  rounded-xl  bg-[#0F111A] p-2 transition-all hover:bg-[#1a1a1a]">
  
      <div className="mb-2 text-lg  text-gray-400">{day}</div>

   
      <div className="space-y-1 flex gap-2  ">
        {events.slice(0, 2).map((event) => (
          <div
            key={event.id}
            className={`truncate rounded-md px-2 py-1 text-xs font-medium text-white ${
              colorClasses[event.color]
            }`}
          >
            {event.name}
          </div>
        ))}

        {events.length > 2 && (
          <div className="text-xs text-gray-400">
            +{events.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;