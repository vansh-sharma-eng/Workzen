import { useMemo } from "react";
import {
  Monitor,
  Home,
  Coffee,
} from "lucide-react";

const STATUS_LABEL = {
  PRESENT: "Present",
  LATE: "Late",
  WFH: "WFH",
  ON_LEAVE: "On Leave",
  ABSENT: "Absent",
};

const getStatusStyle = (status) => {
  switch (status) {
    case "PRESENT":
      return { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" };
    case "LATE":
      return { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" };
    case "WFH":
      return { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" };
    case "ON_LEAVE":
      return { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" };
    case "ABSENT":
      return { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" };
    default:
      return { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" };
  }
};

const initials = (name) =>
  (name || "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "??";

/** @param {{ records: Array<{employeeId, employeeName, status}> }} props — today's real attendance */
export default function LiveEmployeeStatus({ records = [] }) {
  const { present, wfh, onLeave } = useMemo(
    () => ({
      present: records.filter((r) => r.status === "PRESENT").length,
      wfh: records.filter((r) => r.status === "WFH").length,
      onLeave: records.filter((r) => r.status === "ON_LEAVE").length,
    }),
    [records]
  );

  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-white text-md font-semibold">
            Live Employee Status
          </h2>

          <p className="text-[#94A3B8]  text-[13px] mt-1">
            Today's attendance, in real time
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-[#111827] border border-[#1A2035]" title="Present">
            <Monitor size={10} className="text-[#94A3B8]" />
            <span className=" text-xs text-white ">{present}</span>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-[#111827] border border-[#1A2035]" title="Working from home">
            <Home size={10} className="text-[#94A3B8]" />
            <span className="text-xs text-white  ">{wfh}</span>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-[#111827] border border-[#1A2035]" title="On leave">
            <Coffee size={10} className="text-[#94A3B8]" />
            <span className="text-xs text-white ">{onLeave}</span>
          </div>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="h-[120px] flex items-center justify-center text-[#64748B] text-xs">
          No attendance marked for today yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto">
          {records.map((r) => {
            const status = getStatusStyle(r.status);

            return (
              <div
                key={r.employeeId}
                className="flex items-center justify-between p-2 rounded-md border border-[#1A2035] bg-[#0F1529] hover:border-[#2A3350] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#161D42] flex items-center justify-center">
                    <span className="text-[#6366F1] font-semibold text-xs">
                      {initials(r.employeeName)}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-white font-semibold text-sm">{r.employeeName}</h5>
                  </div>
                </div>

                <div className={`flex items-center gap-2 px-2 py-1 rounded-full ${status.bg}`}>
                  <div className={`w-2 h-2 rounded-full ${status.dot}`} />
                  <span className={`text-[10px] font-medium ${status.text}`}>
                    {STATUS_LABEL[r.status] || r.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
