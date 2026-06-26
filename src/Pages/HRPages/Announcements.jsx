import React, { useState } from "react";

import AnnouncementHeader from "../../Components/HR/Announcements/AnnouncementHeader";
import AnnouncementFilters from "../../Components/HR/Announcements/AnnouncementFilters";
import AnnouncementStats from "../../Components/HR/Announcements/AnnouncementStats";
import AnnouncementList from "../../Components/HR/Announcements/AnnouncementList";

const Announcements = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="h-autotext-white p-5 space-y-6">
     
      <AnnouncementHeader />

      <AnnouncementFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

    
      <AnnouncementStats />

      {/* Announcement List */}
      <AnnouncementList activeFilter={activeFilter} />
    </div>
  );
};

export default Announcements;