import React, { useContext, useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { AuthContext } from "../../Context/AuthProvider";
import { taskApi } from "../../../api";

/**
 * "Performance score" here = real task completion rate per employee
 * (completed / assigned, min. 1 task to qualify) — not a fabricated
 * ML-generated score.
 */
const AutoPerformanceScores = ({ sidebarCollapsed }) => {
  const { userData } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskApi.getAll().then(setTasks).catch(() => setTasks([]));
  }, []);

  const scores = useMemo(() => {
    const employees = userData?.employeesData || [];
    const byEmployee = new Map();

    tasks.forEach((t) => {
      if (!byEmployee.has(t.assignedToId)) byEmployee.set(t.assignedToId, { total: 0, completed: 0 });
      const entry = byEmployee.get(t.assignedToId);
      entry.total += 1;
      if (t.status === "COMPLETED") entry.completed += 1;
    });

    return employees
      .map((e) => {
        const stat = byEmployee.get(e.id);
        if (!stat || stat.total === 0) return null;
        const score = Math.round((stat.completed / stat.total) * 100);
        return { name: e.name, score, total: stat.total };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [tasks, userData]);

  return (
    <div
      className={`rounded-md bg-[#10111C] border border-[#1E2235] p-5
      flex flex-col gap-4 h-[200px] overflow-y-auto transition-all duration-300
      ${
        sidebarCollapsed
          ? "-ml-1 w-[calc(118%)]"
          : "-ml-1 w-[calc(115%)]"
      }`}
    >
      <div className="flex items-center gap-2">
        <Sparkles size={15} className="text-indigo-400" />
        <h1 className="text-white text-sm font-semibold">
          Task Completion Scores
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        {scores.length === 0 ? (
          <p className="text-gray-500 text-sm">No task data yet.</p>
        ) : (
          scores.map((employee) => (
            <div
              key={employee.name}
              className="grid grid-cols-[1fr_140px_50px] items-center"
            >
              <h2 className="text-white text-sm font-medium truncate">{employee.name}</h2>

              <div className="h-1 bg-[#161c34] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${employee.score >= 70 ? "bg-emerald-500" : "bg-red-500"}`}
                  style={{ width: `${employee.score}%` }}
                />
              </div>

              <span className="text-white text-sm font-semibold text-right">{employee.score}%</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AutoPerformanceScores;
