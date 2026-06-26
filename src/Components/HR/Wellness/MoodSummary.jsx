import React from "react";
import MoodCard from "./MoodCard";
import { moodSummary } from "../../../data/HrData/moodData";

const MoodSummary = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
      {moodSummary.map((item) => (
        <MoodCard key={item.id} mood={item} />
        
      ))}
    </div>
  );
};

export default MoodSummary;