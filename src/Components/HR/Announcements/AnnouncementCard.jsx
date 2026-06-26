import React from "react";
import {
  Pin,
  Globe,
  Trash2,
  Star,
  Clock,
  User,
} from "lucide-react";

import PriorityBadge from "./PriorityBadge";
import ReactionBar from "./ReactionBar";

const AnnouncementCard = ({ announcement }) => {
  const borderColor = {
    Info: "border-l-4 border-blue-500",
    Important: "border-l-4 border-yellow-500",
    Urgent: "border-l-4 border-red-500",
  };

  return (
    <div
      className={`bg-[#14151c] border border-[#272727] rounded-2xl p-6 transition-all duration-300 hover:border-gray-500 ${borderColor[announcement.type]}`}
    >
   
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <div className="flex-1">
         
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <PriorityBadge type={announcement.type} />

            {announcement.pinned && (
              <span className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <Pin size={14} />
                Pinned
              </span>
            )}

            <span className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-gray-700/30 text-gray-300 border border-[#272727]">
              <Globe size={14} />
              {announcement.audience}
            </span>
          </div>

          <h2 className="text-md font-semibold text-white mb-1">
            {announcement.title}
          </h2>

         
          <p className="text-gray-400 leading-5 text-sm">
            {announcement.description}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="h-9 w-9 rounded-md bg-[#1b1c23] border border-[#272727] hover:border-yellow-500 transition">
            <Star
              size={15}
              className="mx-auto text-yellow-400 "
            />
          </button>

          <button className="h-9 w-9 rounded-md bg-[#1b1c23] border border-[#272727] hover:border-red-500 transition">
            <Trash2
              size={15}
              className="mx-auto text-red-400"
            />
          </button>
        </div>
      </div>


      <div>
        <ReactionBar reactions={announcement.reactions} />
      </div>

      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mt-3 pt-2 border-t border-[#525252]">
        <div className="flex items-center gap-2">
          <User size={14} />
          {announcement.author}
        </div>

        <div className="flex items-center gap-2">
          <Clock size={14} />
          {announcement.time}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;