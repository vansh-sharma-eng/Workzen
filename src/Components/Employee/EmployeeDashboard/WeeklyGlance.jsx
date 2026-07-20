import React, { useEffect, useState } from "react";
import attendanceApi from "../../../api/attendanceApi";

const STATUS_STYLE = {
  PRESENT: { color: "bg-green-500", icon: "✓" },
  WFH: { color: "bg-indigo-500", icon: "✓" },
  LATE: { color: "bg-yellow-500", icon: "✓" },
  ABSENT: { color: "bg-red-500", icon: "✕" },
  ON_LEAVE: { color: "bg-red-400", icon: "L" },
};

const QUOTES = [
  ["Success is not final, failure is not fatal: it is the courage to continue that counts.", "Winston Churchill"],
  ["The way to get started is to quit talking and begin doing.", "Walt Disney"],
  ["Well done is better than well said.", "Benjamin Franklin"],
];
// Deterministic pick per day so it doesn't flicker between renders, but still varies day to day.
const quote = QUOTES[new Date().getDate() % QUOTES.length];

const mondayOfThisWeek = () => {
  const d = new Date();
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const WeeklyGlance = ({ employeeId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!employeeId) return;
    attendanceApi.getForEmployee(employeeId)
      .then((res) => setRecords(res || []))
      .catch(() => setRecords([]))
      .finally(() => setLoading(false));
  }, [employeeId]);

  const monday = mondayOfThisWeek();
  const weekData = ["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const iso = date.toISOString().slice(0, 10);
    const record = records.find((r) => r.date === iso);
    const isFuture = date > new Date();
    const style = record ? STATUS_STYLE[record.status] : null;
    return {
      day,
      color: style?.color || "bg-gray-700",
      icon: isFuture ? "" : style?.icon || "",
    };
  });

  return (
    <div className=" bg-[#10111C] border border-[#1E2235] rounded-md p-6  h-auto w-109 ml-15">
      <h2 className="text-white text-xl font-bold mb-8">
        This Week at a Glance
      </h2>

      <div className="flex justify-between mb-14">
        {(loading ? Array(5).fill({ day: "", color: "bg-gray-800", icon: "" }) : weekData).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-gray-500">
              {item.day}
            </span>

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${item.color}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1f222985] border border-gray-800 rounded-md p-8 text-center">
        <p className="text-gray-500 text-md leading-relaxed">
          "{quote[0]}"
        </p>

        <p className="text-gray-500 mt-4 text-lg">
          — {quote[1]}
        </p>
      </div>
    </div>
  );
};

export default WeeklyGlance;
