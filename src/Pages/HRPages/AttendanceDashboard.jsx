import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Download } from "lucide-react";
import AttendanceStats from "../../Components/Admin/AdminAttendance/AttendanceStats";
import AttendanceChart from "../../Components/Admin/AdminAttendance/AttendanceChart";
import AttendanceTable from "../../Components/Admin/AdminAttendance/AttendanceTable";
import WfhRequestsPanel from "../../Components/Attendance/WfhRequestsPanel";
import attendanceApi from "../../api/attendanceApi";
import employeeApi from "../../api/employeeApi";
import { exportToCsv } from "../../Utils/exportToCsv";

const todayIso = () => new Date().toISOString().slice(0, 10);

/** HR's Attendance dashboard — scoped entirely to their own team (managerId = current HR). */
const AttendanceDashboard = ({ data }) => {
  const hrId = data?.id;

  const [employees, setEmployees] = useState([]);
  const [date, setDate] = useState(todayIso());
  const [records, setRecords] = useState([]);
  const [statsDto, setStatsDto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marking, setMarking] = useState(null);
  const [deptFilter, setDeptFilter] = useState("All");

  const load = useCallback(() => {
    if (!hrId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      employeeApi.getByManager(hrId),
      attendanceApi.getForDate(date, { managerId: hrId }),
      attendanceApi.getStats(date, { managerId: hrId }),
    ])
      .then(([team, recs, stats]) => {
        setEmployees(team || []);
        setRecords(recs || []);
        setStatsDto(stats);
      })
      .catch((err) => setError(err.message || "Failed to load attendance."))
      .finally(() => setLoading(false));
  }, [date, hrId]);

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

  const departments = useMemo(
    () => ["All", ...new Set(employees.map((e) => e.department).filter(Boolean))],
    [employees]
  );

  const stats = [
    { id: "present", title: "Present", value: statsDto?.present ?? 0, percentage: statsDto?.total ? `${Math.round((statsDto.present / statsDto.total) * 100)}%` : "", bg: "bg-emerald-500/10", color: "text-emerald-400" },
    { id: "late", title: "Late", value: statsDto?.late ?? 0, percentage: statsDto?.total ? `${Math.round((statsDto.late / statsDto.total) * 100)}%` : "", bg: "bg-amber-500/10", color: "text-amber-400" },
    { id: "wfh", title: "Work From Home", value: statsDto?.wfh ?? 0, percentage: statsDto?.total ? `${Math.round((statsDto.wfh / statsDto.total) * 100)}%` : "", bg: "bg-indigo-500/10", color: "text-indigo-400" },
    { id: "absent", title: "Absent", value: statsDto?.absent ?? 0, percentage: statsDto?.total ? `${Math.round((statsDto.absent / statsDto.total) * 100)}%` : "", bg: "bg-red-500/10", color: "text-red-400" },
  ];

  // Weekly trend: real present-rate per day for the 7 days ending on the selected date, scoped to this HR's team.
  const [weeklyAttendance, setWeeklyAttendance] = useState([]);
  useEffect(() => {
    if (!hrId) return;
    let cancelled = false;
    const end = new Date(date);
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(end.getDate() - i);
      days.push(d);
    }
    Promise.all(days.map((d) => attendanceApi.getStats(d.toISOString().slice(0, 10), { managerId: hrId }).catch(() => null)))
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
  }, [date, hrId]);

  const filteredEmployees = deptFilter === "All" ? employees : employees.filter((e) => e.department === deptFilter);

  const rows = filteredEmployees.map((emp) => {
    const rec = records.find((r) => r.employeeId === emp.id);
    return {
      id: emp.id,
      initials: (emp.name || "??").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase(),
      employee: emp.name,
      checkIn: rec?.checkIn || "—",
      checkOut: rec?.checkOut || "—",
      mode: rec?.status === "WFH" ? "Remote" : "Office",
      status: rec ? rec.status : null,
    };
  });

  return (
    <div className="min-h-screen w-full bg-[#0F111A] text-white pt-4">
      <main>
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <input
            type="date"
            value={date}
            max={todayIso()}
            onChange={(e) => setDate(e.target.value)}
            className="bg-[#10111C] border border-[#1E2235] text-white text-sm rounded-md px-3 py-2"
          />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-[#10111C] border border-[#1E2235] text-white text-sm rounded-md px-3 py-2"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <span className="text-xs text-gray-500">{employees.length} on your team</span>
          {loading && <span className="text-xs text-gray-400">Loading…</span>}
          {error && <span className="text-xs text-red-400">{error}</span>}
          <button
            onClick={() => exportToCsv(
              `attendance-${date}`,
              [
                { key: "employee", label: "Employee" },
                { key: "status", label: "Status" },
                { key: "checkIn", label: "Check In" },
                { key: "checkOut", label: "Check Out" },
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

        <AttendanceStats stats={stats} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
          <div className="xl:col-span-4">
            <AttendanceChart data={weeklyAttendance} />
          </div>
          <div className="xl:col-span-8">
            <AttendanceTable data={rows} date={date} onMark={handleMark} marking={marking} />
          </div>
        </div>

        <WfhRequestsPanel managerId={hrId} />
      </main>
    </div>
  );
};

export default AttendanceDashboard;
