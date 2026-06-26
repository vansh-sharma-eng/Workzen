import React from "react";
import { Megaphone, Plus } from "lucide-react";

const AnnouncementHeader = () => {
  return (
    <div className="flex flex-col float-right mt-2">
  
      <button className="inline-flex items-center  gap-2 bg-white text-black px-2 py-2 rounded-md  font-semibold hover:bg-gray-200 transition-all">
        <Plus size={18} />
        New Announcement
      </button>
    </div>
  );
};

export default AnnouncementHeader;