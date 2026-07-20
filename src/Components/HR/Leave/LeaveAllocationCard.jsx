import React from "react";
import {
  CalendarDays,
  Briefcase,
  HeartPulse,
  Wallet,
} from "lucide-react";

// Keyed by the real leave type labels this app actually uses (see LeaveType.java on the backend) —
// not "Annual Leave" / "WFH", which aren't real leave types here (WFH is tracked separately).
const iconMap = {
  "Casual Leave": CalendarDays,
  "Sick Leave": HeartPulse,
  "Paid Leave": Wallet,
};

const colorMap = {
  "Casual Leave": {
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    icon: "text-orange-400",
  },
  "Sick Leave": {
    bg: "bg-red-500/15",
    text: "text-red-400",
    icon: "text-red-400",
  },
  "Paid Leave": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    icon: "text-emerald-400",
  },
};

const LeaveAllocationCard = ({ allocation }) => {
  const Icon = iconMap[allocation.type] || Briefcase;
  const colors = colorMap[allocation.type] || { bg: "bg-slate-500/15", text: "text-slate-400", icon: "text-slate-400" };

  return (
    <div className="rounded-xl border border-[#262626] bg-[#141414] p-6 transition-all duration-300 hover:border-[#3a3a3a] hover:-translate-y-1">
 
     <div className="flex gap-4">
         <div
        className={`mb-2 flex h-9 w-9 items-center justify-center rounded-md ${colors.bg}`}
      >
        <Icon size={20} className={colors.icon} />
      </div>

    
      <h3 className="text-md mt-1 font-semibold text-white">
        {allocation.type}
      </h3>
     </div>

   
      <div className="mt-1 flex items-end   gap-2">
        <span className={`text-3xl font-bold ${colors.text}`}>
          {allocation.days}
        </span>

        <span className="mb-1 text-xs text-gray-400">
          {allocation.unit}
        </span>
      </div>

 
      

      
      

      
    </div>
  );
};

export default LeaveAllocationCard;