import React from "react";
import StatCard from "./StatCard";

const StatsSection = ({ team = [], attendanceRate = 0, pendingCount = 0, departmentCount = 0, loading }) => {
  const cards = [
    {
      id: "team",
      icon: "Users",
      title: "Team Size",
      value: loading ? "…" : team.length,
      subtitle: "Employees you manage",
      color: "#6366F1",
      border: "border-[#1A2035]",
    },
    {
      id: "attendance",
      icon: "CalendarClock",
      title: "Attendance Today",
      value: loading ? "…" : `${attendanceRate}%`,
      subtitle: "Present, late, or WFH",
      color: "#22C55E",
      border: "border-[#1A2035]",
    },
    {
      id: "pending",
      icon: "HeartPulse",
      title: "Pending Approvals",
      value: loading ? "…" : pendingCount,
      subtitle: "Leave & WFH requests",
      color: pendingCount > 0 ? "#F59E0B" : "#6B7280",
      border: pendingCount > 0 ? "border-amber-500/30" : "border-[#1A2035]",
    },
    {
      id: "departments",
      icon: "BriefcaseBusiness",
      title: "Departments",
      value: loading ? "…" : departmentCount,
      subtitle: "Represented on your team",
      color: "#EC4899",
      border: "border-[#1A2035]",
    },
  ];

  return (
    <section className="mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <StatCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
