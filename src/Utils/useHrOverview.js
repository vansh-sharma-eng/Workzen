import { useCallback, useEffect, useState } from "react";
import employeeApi from "../api/employeeApi";
import attendanceApi from "../api/attendanceApi";
import leaveApi from "../api/leaveApi";
import wfhApi from "../api/wfhApi";

const isoDate = (d) => d.toISOString().slice(0, 10);

/**
 * Single source of truth for the HR dashboard landing page (team, today's attendance,
 * pending leave/WFH requests, department breakdown) — scoped to just this HR's own team
 * via managerId, the same way LeaveManagement/AttendanceDashboard already scope things.
 */
export function useHrOverview(hrId) {
  const [team, setTeam] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [pendingWfh, setPendingWfh] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!hrId) return;
    setLoading(true);
    try {
      const todayIso = isoDate(new Date());
      const [teamData, attendanceData, leavesData, wfhData] = await Promise.all([
        employeeApi.getByManager(hrId).catch(() => []),
        attendanceApi.getForDate(todayIso, { managerId: hrId }).catch(() => []),
        leaveApi.getPending({ managerId: hrId }).catch(() => []),
        wfhApi.getPending({ managerId: hrId }).catch(() => []),
      ]);
      setTeam(teamData || []);
      setTodayAttendance(attendanceData || []);
      setPendingLeaves(leavesData || []);
      setPendingWfh(wfhData || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Couldn't load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [hrId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial dashboard data fetch
    load();
  }, [load]);

  const departmentStrength = (() => {
    const counts = new Map();
    team.forEach((e) => {
      const dept = e.department || "Unassigned";
      counts.set(dept, (counts.get(dept) || 0) + 1);
    });
    const colors = ["#6366F1", "#22C55E", "#F59E0B", "#EC4899", "#06B6D4", "#8B5CF6"];
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([department, employees], i) => ({ department, employees, color: colors[i % colors.length] }));
  })();

  const presentToday = todayAttendance.filter((a) => a.status === "PRESENT").length;
  const lateToday = todayAttendance.filter((a) => a.status === "LATE").length;
  const wfhToday = todayAttendance.filter((a) => a.status === "WFH").length;
  const onLeaveToday = todayAttendance.filter((a) => a.status === "ON_LEAVE").length;
  const markedToday = todayAttendance.length;
  const absentToday = Math.max(0, team.length - markedToday);

  const attendanceRate = team.length
    ? Math.round(((presentToday + lateToday + wfhToday) / team.length) * 100)
    : 0;

  return {
    team,
    todayAttendance,
    pendingLeaves,
    pendingWfh,
    departmentStrength,
    attendanceBreakdown: {
      present: presentToday,
      late: lateToday,
      wfh: wfhToday,
      onLeave: onLeaveToday,
      absent: absentToday,
    },
    attendanceRate,
    loading,
    error,
    refresh: load,
  };
}
