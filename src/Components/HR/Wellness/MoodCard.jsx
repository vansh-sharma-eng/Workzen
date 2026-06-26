import React from "react";

const colorStyles = {
  emerald: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    progress: "bg-emerald-500",
  },
  indigo: {
    bg: "bg-indigo-500/15",
    text: "text-indigo-400",
    progress: "bg-indigo-500",
  },
  amber: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    progress: "bg-amber-500",
  },
  orange: {
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    progress: "bg-orange-500",
  },
  red: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    progress: "bg-red-500",
  },
};

const MoodCard = ({ mood }) => {
  const style = colorStyles[mood.color];

  const progress = Math.min((mood.value / 10) * 100, 100);

  return (
    <div className="bg-[#151822] border border-[#1e2333] rounded-md p-4 transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1">

     

      <div className="flex items-center justify-between">

        <div
          className={`w-9 h-9 rounded-md flex items-center justify-center text-lg ${style.bg}`}
        >
          {mood.emoji}
        </div>

        <h2 className={`text-2xl font-bold ${style.text}`}>
          {mood.value}
        </h2>

      </div>

    

    
     

     

    </div>
  );
};

export default MoodCard;