import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarDay from "./CalendarDay";
import leaveApi from "../../../api/leaveApi";

const TYPE_COLOR = { SICK: "red", CASUAL: "orange", PAID: "green", UNPAID: "purple" };
const TYPE_LABEL = { SICK: "Sick Leave", CASUAL: "Casual Leave", PAID: "Paid Leave", UNPAID: "Unpaid Leave" };

const TeamCalendar = ({ managerId }) => {
  const [cursor, setCursor] = useState(new Date());
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    leaveApi
      .getAll(managerId ? { managerId } : undefined)
      .then((res) => setLeaves((res || []).filter((l) => l.status === "APPROVED")))
      .catch((err) => setError(err.message || "Failed to load leave calendar."))
      .finally(() => setLoading(false));
  }, [managerId]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // A map of day-of-month -> events. Recomputed each render — this is a small, cheap loop
  // (days-in-month × this team's approved leave count), so it doesn't need memoizing, which
  // also sidesteps React Compiler's strict rules about memoizing values derived from
  // every-render-recomputed locals like `year`/`month` (see TeamCalendar's `cursor` state above).
  const eventsByDay = {};
  for (let day = 1; day <= daysInMonth; day++) {
    const dateIso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    eventsByDay[day] = leaves
      .filter((l) => dateIso >= l.fromDate && dateIso <= l.toDate)
      .map((l) => ({ id: `${l.id}-${day}`, name: l.employeeName, color: TYPE_COLOR[l.type] || "blue" }));
  }

  const goPrev = () => setCursor(new Date(year, month - 1, 1));
  const goNext = () => setCursor(new Date(year, month + 1, 1));
  const goToday = () => setCursor(new Date());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Team Leave Calendar
          </h2>

          <p className="mt-1 text-gray-400">
            {monthLabel} • Team availability overview {loading && "· loading…"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={goPrev} className="rounded-lg border border-[#2b2b2b] p-2 text-gray-300 transition hover:bg-[#1d1d1d]">
            <ChevronLeft size={18} />
          </button>

          <button onClick={goToday} className="rounded-lg bg-[#191919] px-5 py-2 text-white hover:bg-[#232323] transition">
            {monthLabel}
          </button>

          <button onClick={goNext} className="rounded-lg border border-[#2b2b2b] p-2 text-gray-300 transition hover:bg-[#1d1d1d]">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Legend */}
      <div className="flex flex-wrap gap-6 rounded-xl border border-[#262626] bg-[#141414] p-4">
        {Object.entries(TYPE_LABEL).map(([type, label]) => (
          <div key={type} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full bg-${TYPE_COLOR[type] === "green" ? "emerald" : TYPE_COLOR[type]}-500`}></span>
            <span className="text-sm text-gray-300">{label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="rounded-xl border border-[#262626] bg-[#141414] p-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((d) => (
            <div key={d} className="text-center text-xs text-gray-500 font-medium">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <CalendarDay key={day} day={day} events={eventsByDay[day] || []} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCalendar;
