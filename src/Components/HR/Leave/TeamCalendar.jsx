import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarDay from "./CalendarDay";
import { calendarEvents } from "../../../data/HrData/calendarData";

const TeamCalendar = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getEvents = (day) => {
    return calendarEvents.filter(
      (event) => day >= event.start && day <= event.end
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Team Leave Calendar
          </h2>

          <p className="mt-1 text-gray-400">
            January 2024 • Team availability overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-[#2b2b2b] p-2 text-gray-300 transition hover:bg-[#1d1d1d]">
            <ChevronLeft size={18} />
          </button>

          <span className="rounded-lg bg-[#191919] px-5 py-2 text-white">
            January 2024
          </span>

          <button className="rounded-lg border border-[#2b2b2b] p-2 text-gray-300 transition hover:bg-[#1d1d1d]">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Legend */}

      <div className="flex flex-wrap gap-6 rounded-xl border border-[#262626] bg-[#141414] p-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="text-sm text-gray-300">Sick Leave</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-orange-500"></span>
          <span className="text-sm text-gray-300">Casual Leave</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
          <span className="text-sm text-gray-300">Annual Leave</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-indigo-500"></span>
          <span className="text-sm text-gray-300">WFH</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-violet-500"></span>
          <span className="text-sm text-gray-300">Training</span>
        </div>
      </div>

      {/* Calendar */}

      <div className="overflow-x-auto rounded-2xl border border-[#262626] bg-[#101010] p-4">
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((day) => (
            <div
              key={day}
              className="pb-3 text-center text-sm font-semibold uppercase tracking-wide text-gray-500"
            >
              {day}
            </div>
          ))}

          {days.map((day) => (
            <CalendarDay
              key={day}
              day={day}
              events={getEvents(day)}
            />
          ))}
        </div>
      </div>

      {/* Summary */}

      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-xl border border-[#262626] bg-[#141414] p-5">
          <p className="text-sm text-gray-400">Employees on Leave</p>

          <h3 className="mt-2 text-3xl font-bold text-white">12</h3>
        </div>

        <div className="rounded-xl border border-[#262626] bg-[#141414] p-5">
          <p className="text-sm text-gray-400">WFH Today</p>

          <h3 className="mt-2 text-3xl font-bold text-indigo-400">6</h3>
        </div>

        <div className="rounded-xl border border-[#262626] bg-[#141414] p-5">
          <p className="text-sm text-gray-400">Pending Requests</p>

          <h3 className="mt-2 text-3xl font-bold text-amber-400">7</h3>
        </div>

        <div className="rounded-xl border border-[#262626] bg-[#141414] p-5">
          <p className="text-sm text-gray-400">Coverage</p>

          <h3 className="mt-2 text-3xl font-bold text-emerald-400">96%</h3>
        </div>
      </div>
    </div>
  );
};

export default TeamCalendar;