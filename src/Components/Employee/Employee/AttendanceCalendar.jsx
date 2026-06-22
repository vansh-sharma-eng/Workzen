import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { attendanceData } from "./attendanceData";

const AttendanceCalendar = () => {
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  
  const startDay = (firstDay.getDay() + 6) % 7;

  const days = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i);
  }

  const getStatus = (day) => {
    if (!day) return "";

    const key = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    return attendanceData[key];
  };

  return (
    <div className=" bg-[#10111C] border border-[#1E2235] rounded-md p-5">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl ml-2 font-semibold text-white">
          {date.toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setDate(new Date(year, month - 1, 1))
            }
            className="w-6 h-6 rounded-md bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            onClick={() =>
              setDate(new Date(year, month + 1, 1))
            }
            className="w-6 h-6 rounded-md bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

     
      <div className="grid grid-cols-7 gap-2 mb-3">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(
          (day) => (
            <div
              key={day}
              className="flex justify-center items-center text-xs font-medium text-slate-400"
            >
              {day}
            </div>
          )
        )}
      </div>


      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const status = getStatus(day);

          return (
            <div
              key={index}
              className={`
                h-14 rounded-md
                flex items-center justify-center
                text-sm font-medium
                transition-all duration-200

                ${
                  !day
                    ? "bg-transparent"
                    : ""
                }

                ${
                  status === "present"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : ""
                }

                ${
                  status === "absent"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : ""
                }

                ${
                  status === "late"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : ""
                }

                ${
                  !status && day
                    ? "bg-[#161B2E] text-slate-300 hover:bg-[#1D243A]"
                    : ""
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex gap-5 mt-5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          Present
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          Absent
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          Late
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;