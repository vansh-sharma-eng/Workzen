import React from "react";
import { Eye, Pencil, KeyRound } from "lucide-react";

const AVATAR_COLORS = ["#7C3AED", "#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#0EA5E9", "#EC4899"];
const DEPT_COLORS = {
  Engineering: "#4F46E5", Design: "#8B5CF6", Marketing: "#A855F7", Sales: "#22C55E",
  Finance: "#EF4444", Operations: "#F97316", HR: "#14B8A6", Product: "#F59E0B",
  Analytics: "#06B6D4", Backend: "#0EA5E9", Frontend: "#D946EF", Management: "#84CC16",
};

const getInitials = (name) => {
  const parts = (name || "").trim().split(/\s+/);
  return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase() || "?";
};

const colorFor = (id) => AVATAR_COLORS[(id || 0) % AVATAR_COLORS.length];

const formatJoinDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" });
};

const EmployeeRow = ({ employee, onView, onEdit, onResetPassword }) => {
  const status = employee.onLeave ? "On Leave" : employee.isActive === false ? "Inactive" : "Active";

  const getStatusStyle = (s) => {
    switch (s) {
      case "Active": return "bg-emerald-500/15 text-emerald-400";
      case "On Leave": return "bg-amber-500/15 text-amber-400";
      case "Inactive": return "bg-red-500/15 text-red-400";
      default: return "bg-slate-500/15 text-slate-300";
    }
  };

  return (
    <tr className="border-b border-[#1A2035] hover:bg-[#171A27] transition-all">
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 text-xs rounded-full flex items-center justify-center text-white font-semibold shrink-0"
            style={{ backgroundColor: colorFor(employee.id) }}
          >
            {getInitials(employee.name)}
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold whitespace-nowrap">{employee.name}</h3>
            <p className="text-gray-400 text-xs whitespace-nowrap">{employee.email}</p>
          </div>
        </div>
      </td>

      <td className="px-2 text-sm py-2 text-gray-300 whitespace-nowrap">
        {employee.position || "—"}
      </td>

      <td className="px-8 py-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: DEPT_COLORS[employee.department] || "#64748B" }} />
          <span className="text-white text-sm whitespace-nowrap">{employee.department || "—"}</span>
        </div>
      </td>

      <td className="px-6 py-2">
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(status)}`}>
          {status}
        </span>
      </td>

      <td className="px-5 py-2 text-gray-300 text-sm whitespace-nowrap">
        {formatJoinDate(employee.createdAt)}
      </td>

      <td className="px-9 py-2">
        <span className="text-white font-semibold text-sm">{employee.taskCount ?? 0}</span>
      </td>

      <td className="px-2 py-4">
        <div className="flex items-center">
          <button onClick={() => onView?.(employee)} className="w-9 h-9 rounded-lg hover:bg-[#1A2035] flex items-center justify-center transition">
            <Eye size={14} className="text-gray-400 hover:text-white" />
          </button>
          <button onClick={() => onEdit?.(employee)} className="w-9 h-9 rounded-lg hover:bg-[#1A2035] flex items-center justify-center transition">
            <Pencil size={14} className="text-gray-400 hover:text-indigo-400" />
          </button>
          <button onClick={() => onResetPassword?.(employee)} title="Reset password" className="w-9 h-9 rounded-lg hover:bg-[#1A2035] flex items-center justify-center transition">
            <KeyRound size={14} className="text-gray-400 hover:text-amber-400" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;
