import React from "react";
import { CalendarDays } from "lucide-react";

const HolidayCard = ({ holiday }) => {
  return (
    <div className="group flex items-center justify-between rounded-md border border-[#262626] bg-[#141414] p-4 transition-all duration-300 hover:border-[#3b82f6]/40 hover:bg-[#181818]">

      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500/10">
          <CalendarDays
            size={18}
            className="text-blue-400"
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-white">
            {holiday.title}
          </h3>

          <p className="text-xs text-gray-400">
            Public Holiday
          </p>
        </div>
      </div>

    
      <div className="text-right">
        <span className="rounded-md bg-[#1c1c1c] px-2 py-1 text-xs font-medium text-gray-300">
          {holiday.date}
        </span>
      </div>
    </div>
  );
};

export default HolidayCard;