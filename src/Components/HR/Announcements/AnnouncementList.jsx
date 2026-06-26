import React from "react";
import AnnouncementCard from "./AnnouncementCard";
import { announcements } from "../../../data/HrData/announcementsData";

const AnnouncementList = ({ activeFilter }) => {
  const filteredAnnouncements =
    activeFilter === "All"
      ? announcements
      : announcements.filter(
          (announcement) => announcement.type === activeFilter
        );

  return (
    <div className="space-y-5">
      {filteredAnnouncements.length > 0 ? (
        filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
          />
        ))
      ) : (
        <div className="bg-[#14151c] border border-[#272727] rounded-2xl py-16 text-center">
          <h3 className="text-xl font-semibold text-white">
            No Announcements Found
          </h3>

          <p className="text-gray-400 mt-2">
            There are no announcements in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;