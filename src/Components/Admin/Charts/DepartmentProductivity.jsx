import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const PALETTE = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#EC4899"];

/**
 * "Productivity" here is a real, defensible number: task completion rate
 * per department (completed / total tasks assigned to that department's
 * employees) — not a fuzzy simulated score.
 * @param {{ employees: Array, tasks: Array }} props
 */
const DepartmentProductivity = ({ employees = [], tasks = [] }) => {
  const data = useMemo(() => {
    const deptByEmployeeId = new Map(employees.map((e) => [e.id, e.department || "Unassigned"]));
    const totals = new Map();

    tasks.forEach((t) => {
      const dept = deptByEmployeeId.get(t.assignedToId) || "Unassigned";
      if (!totals.has(dept)) totals.set(dept, { total: 0, completed: 0 });
      const entry = totals.get(dept);
      entry.total += 1;
      if (t.status === "COMPLETED") entry.completed += 1;
    });

    return [...totals.entries()]
      .filter(([, v]) => v.total > 0)
      .map(([department, v], idx) => ({
        department,
        score: Math.round((v.completed / v.total) * 100),
        total: v.total,
        color: PALETTE[idx % PALETTE.length],
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [employees, tasks]);

  return (
    <div className="bg-[#13141F] border border-[#1E2337] rounded-xl p-5  h-[320px]">
      <div className="">
        <h2 className="text-white text-[14px] font-semibold">
          Department Productivity
        </h2>

        <p className="text-[#94A3B8] text-[9px]">
          Task completion rate by department
        </p>
      </div>

      {data.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center text-[#64748B] text-xs">
          No tasks assigned yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} style={{ outline: "none" }} className="h-10 mt-5">
            <XAxis
              dataKey="department"
              stroke="#94A3B8"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#94A3B8"
              domain={[0, 100]}
            />

            <Tooltip
              contentStyle={{
                background: "#1E2337",
                border: "1px solid #1E2337",
                borderRadius: "10px",
              }}
              itemStyle={{ color: "#FFFFFF" }}
              labelStyle={{ color: "#CBD5E1" }}
              formatter={(value, name, props) => [`${value}% (${props.payload.total} tasks)`, "Completion"]}
              cursor={{ fill: "#1E2337", opacity: 0.9 }}
            />

            <Bar dataKey="score" barSize={45} radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      <div className=" mb-2 flex flex-wrap gap-4">
        {data.map((item) => (
          <div key={item.department} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-[#CBD5E1]">{item.department}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentProductivity;
