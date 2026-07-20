import React, { useContext, useEffect, useState, useCallback } from "react";
import { Download } from "lucide-react";
import AttendanceStats from "../../Components/Admin/AdminAttendance/AttendanceStats";
import AttendanceChart from "../../Components/Admin/AdminAttendance/AttendanceChart";
import AttendanceTable from "../../Components/Admin/AdminAttendance/AttendanceTable";
import WfhRequestsPanel from "../../Components/Attendance/WfhRequestsPanel";
import { AuthContext } from "../../Components/Context/AuthProvider";
import attendanceApi from "../../api/attendanceApi";
import { exportToCsv } from "../../Utils/exportToCsv";

const todayIso = () => new Date().toISOString().slice(0, 10);

const AttendanceDashboard = ({ sidebarCollapsed }) => {
  const { userData } = useContext(AuthContext);
  const employees = userData.employeesData || [];
  const hrOptions = userData.hrData || [];

  const [date, setDate] = useState(todayIso());
  const [teamFilter, setTeamFilter] = useState("All");
  const [records, setRecords] = useState([]);
  const [statsDto, setStatsDto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marking, setMarking] = useState(null); // employeeId currently being marked

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    const opts = teamFilter !== "All" ? { managerId: Number(teamFilter) } : undefined;
    Promise.all([attendanceApi.getForDate(date, opts), attendanceApi.getStats(date, opts)])
      .then(([recs, stats]) => {
        setRecords(recs || []);
        setStatsDto(stats);
      })
      .catch((err) => setError(err.message || "Failed to load attendance."))
      .finally(() => setLoading(false));
  }, [date, teamFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const handleMark = async (employeeId, status) => {
    setMarking(employeeId);
    try {
      await attendanceApi.mark({
        employeeId,
        date,
        status,
        checkIn: status === "ABSENT" || status === "ON_LEAVE" ? null : new Date().toTimeString().slice(0, 5),
      });
      load();
    } catch (err) {
      setError(err.message || "Failed to mark attendance.");
    } finally {
      setMarking(null);
    }
  };

  const stats = [
    {
      id: "present",
      title: "Present",
      value: statsDto?.present ?? 0,
      percentage: statsDto?.total ? `${Math.round((statsDto.present / statsDto.total) * 100)}%` : "",
      bg: "bg-emerald-500/10",
      color: "text-emerald-400",
    },
    {
      id: "late",
      title: "Late",
      value: statsDto?.late ?? 0,
      percentage: statsDto?.total ? `${Math.round((statsDto.late / statsDto.total) * 100)}%` : "",
      bg: "bg-amber-500/10",
      color: "text-amber-400",
    },
    {
      id: "wfh",
      title: "Work From Home",
      value: statsDto?.wfh ?? 0,
      percentage: statsDto?.total ? `${Math.round((statsDto.wfh / statsDto.total) * 100)}%` : "",
      bg: "bg-indigo-500/10",
      color: "text-indigo-400",
    },
    {
      id: "absent",
      title: "Absent",
      value: statsDto?.absent ?? 0,
      percentage: statsDto?.total ? `${Math.round((statsDto.absent / statsDto.total) * 100)}%` : "",
      bg: "bg-red-500/10",
      color: "text-red-400",
    },
  ];

  // Weekly trend: real present-rate per day for the 7 days ending on the selected date.
  const [weeklyAttendance, setWeeklyAttendance] = useState([]);
  useEffect(() => {
    let cancelled = false;
    const opts = teamFilter !== "All" ? { managerId: Number(teamFilter) } : undefined;
    const end = new Date(date);
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(end.getDate() - i);
      days.push(d);
    }
    Promise.all(days.map((d) => attendanceApi.getStats(d.toISOString().slice(0, 10), opts).catch(() => null)))
      .then((statsPerDay) => {
        if (cancelled) return;
        setWeeklyAttendance(
          days.map((d, idx) => ({
            day: d.toLocaleDateString("en-US", { weekday: "short" }),
            value: statsPerDay[idx]?.total
              ? Math.round(((statsPerDay[idx].present + statsPerDay[idx].wfh) / statsPerDay[idx].total) * 100)
              : 0,
          }))
        );
      });
    return () => { cancelled = true; };
  }, [date, teamFilter]);

  const computeHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "—";
    const [inH, inM] = checkIn.split(":").map(Number);
    const [outH, outM] = checkOut.split(":").map(Number);
    const minutes = (outH * 60 + outM) - (inH * 60 + inM);
    if (minutes <= 0) return "—";
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  // Merge every employee with their record for the selected date (or
  // "unmarked" so Admin can mark it directly from this table).
  const teamFilteredEmployees = teamFilter === "All"
    ? employees
    : employees.filter((e) => String(e.managerId) === teamFilter);

  const rows = teamFilteredEmployees.map((emp) => {
    const rec = records.find((r) => r.employeeId === emp.id);
    return {
      id: emp.id,
      initials: (emp.name || "??").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase(),
      employee: emp.name,
      team: emp.managerName,
      checkIn: rec?.checkIn || "—",
      checkOut: rec?.checkOut || "—",
      hours: computeHours(rec?.checkIn, rec?.checkOut),
      mode: rec?.status === "WFH" ? "Remote" : "Office",
      status: rec ? rec.status : null,
    };
  });

  return (
    <div
      className={`
        transition-all
        duration-300
        mt-18
        ${
          sidebarCollapsed
            ? "ml-17 w-[calc(100%-4rem)]"
            : "ml-57 w-[calc(100%-14rem)]"
        }
      `}
    >
      <div className="flex items-center justify-between mb-4 pr-4 flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="date"
            value={date}
            max={todayIso()}
            onChange={(e) => setDate(e.target.value)}
            className="bg-[#10111C] border border-[#1E2235] text-white text-sm rounded-md px-3 py-2"
          />
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="bg-[#10111C] border border-[#1E2235] text-white text-sm rounded-md px-3 py-2"
          >
            <option value="All">All Teams (HR)</option>
            {hrOptions.map((h) => (
              <option key={h.id} value={String(h.id)}>{h.name}'s Team</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          {loading && <span className="text-xs text-gray-400">Loading…</span>}
          {error && <span className="text-xs text-red-400">{error}</span>}
          <button
            onClick={() => exportToCsv(
              `attendance-${date}`,
              [
                { key: "employee", label: "Employee" },
                { key: "team", label: "Team" },
                { key: "status", label: "Status" },
                { key: "checkIn", label: "Check In" },
                { key: "checkOut", label: "Check Out" },
                { key: "hours", label: "Hours" },
                { key: "mode", label: "Mode" },
              ],
              rows
            )}
            disabled={rows.length === 0}
            className="flex items-center gap-1.5 bg-[#10111C] border border-[#1E2235] hover:border-indigo-500 text-gray-300 text-xs font-medium px-3 py-2 rounded-md transition disabled:opacity-40"
          >
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>

      <AttendanceStats stats={stats} />

      <div className="grid grid-cols-12 gap-5 mt-6">
        <div className="col-span-4">
          <AttendanceChart data={weeklyAttendance} />
        </div>

        <div className="col-span-8">
          <AttendanceTable data={rows} date={date} onMark={handleMark} marking={marking} showTeam />
        </div>
      </div>

      <WfhRequestsPanel />
    </div>
  );
};

export default AttendanceDashboard;
