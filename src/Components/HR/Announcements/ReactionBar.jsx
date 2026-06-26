import React from "react";
import { ThumbsUp, Heart, PartyPopper, Smile } from "lucide-react";

const ReactionBar = ({ reactions }) => {
  const reactionItems = [
    {
      icon: ThumbsUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      count: reactions.like,
    },
    {
      icon: Heart,
      color: "text-red-400",
      bg: "bg-red-500/10",
      count: reactions.love,
    },
    {
      icon: PartyPopper,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      count: reactions.party,
    },
    {
      icon: Smile,
      color: "text-green-400",
      bg: "bg-green-500/10",
      count: reactions.wow,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {reactionItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <button
            key={index}
            className={`flex items-center text-xs gap-2 px-3 py-1 mt-2 rounded-md border border-[#272727] ${item.bg} hover:border-gray-500 transition-all duration-300`}
          >
            <Icon size={15} className={item.color} />

            <span className="text-gray-300 font-medium">
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ReactionBar;