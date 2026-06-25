import React from "react";
import StatCard from "./StatCard";
import { statsCards } from "../../../data/HrData/HrdashboardData";
const StatsSection = () => {
  return (
    <section className="mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <StatCard
            key={card.id}
            card={card}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;