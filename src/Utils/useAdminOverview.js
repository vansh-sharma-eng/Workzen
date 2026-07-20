import { useCallback, useEffect, useState } from "react";
import taskApi from "../api/taskApi";
import leaveApi from "../api/leaveApi";
import attendanceApi from "../api/attendanceApi";

const isoDate = (d) => d.toISOString().slice(0, 10);

const last7Days = () => {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push(d);
  }
  return days;
};

/**
 * Single source of truth for the Admin dashboard's cards + charts.
 * Fetches tasks, leaves, today's + last-7-days attendance stats,
 * in parallel, and derives
 * every number the dashboard shows from that real data — nothing here
 * is a hardcoded placeholder.
 */
export function useAdminOverview() {
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [todayStats, setTodayStats] = useState(null);
  const [todayRecords, setTodayRecords] = useState([]);
  const [weekTrend, setWeekTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const days = last7Days();
      const todayIso = isoDate(days[days.length - 1]);
      const [tasksData, leavesData, statsPerDay, todayRecordsData] = await Promise.all([
        taskApi.getAll().catch(() => []),
        leaveApi.getAll().catch(() => []),
        Promise.all(days.map((d) => attendanceApi.getStats(isoDate(d)).catch(() => null))),
        attendanceApi.getForDate(todayIso).catch(() => []),
      ]);

      setTasks(tasksData || []);
      setLeaves(leavesData || []);
      setTodayRecords(todayRecordsData || []);

      const trend = days.map((d, idx) => ({
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: isoDate(d),
        present: (statsPerDay[idx]?.present || 0) + (statsPerDay[idx]?.wfh || 0),
        absent: statsPerDay[idx]?.absent || 0,
        late: statsPerDay[idx]?.late || 0,
      }));
      setWeekTrend(trend);
      setTodayStats(statsPerDay[statsPerDay.length - 1]);
      setError(null);
    } catch (err) {
      setError(err.message || "Couldn't load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial dashboard data fetch
    load();
  }, [load]);

  return { tasks, leaves, todayStats, todayRecords, weekTrend, loading, error, refresh: load };
}
