import React from "react";
import {
  Megaphone,
  AlertTriangle,
  Pin,
  Globe,
} from "lucide-react";
import StatsCard from "./StatsCard";
import { announcements } from "../../../data/HrData/announcementsData";

const AnnouncementStats = () => {
  const totalAnnouncements = announcements.length;

  const urgentAnnouncements = announcements.filter(
    (item) => item.type === "Urgent"
  ).length;

  const pinnedAnnouncements = announcements.filter(
    (item) => item.pinned
  ).length;

  const companyWideAnnouncements = announcements.filter(
    (item) => item.companyWide
  ).length;

  return (
    <div className="flex w-[100%] gap-3">
      <StatsCard
        title="Total Announcements"
        value={totalAnnouncements}
        subtitle="Published announcements"
        icon={Megaphone}
        iconColor="text-blue-400"
        bgColor="bg-blue-500/10"
      />

      <StatsCard
        title="Urgent"
        value={urgentAnnouncements}
        subtitle="Require immediate attention"
        icon={AlertTriangle}
        iconColor="text-red-400"
        bgColor="bg-red-500/10"
      />

      <StatsCard
        title="Pinned"
        value={pinnedAnnouncements}
        subtitle="Featured announcements"
        icon={Pin}
        iconColor="text-yellow-400"
        bgColor="bg-yellow-500/10"
      />

      <StatsCard
        title="Company Wide"
        value={companyWideAnnouncements}
        subtitle="Visible to everyone"
        icon={Globe}
        iconColor="text-green-400"
        bgColor="bg-green-500/10"
      />
    </div>
  );
};

export default AnnouncementStats;