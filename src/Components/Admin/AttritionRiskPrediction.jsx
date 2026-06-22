import React from "react";
import { TriangleAlert } from "lucide-react";

const employees = [
  {
    initials: "RG",
    name: "Rahul Gupta",
    role: "Product",
    risk: 73,
    level: "High",
    color: "bg-red-500",
    textColor: "text-red-400",
    badge: "bg-red-500/10 text-red-400",
    reasons: [
      "Low engagement last 30 days",
      "3 late arrivals",
      "No 1:1 in 6 weeks",
    ],
  },
  {
    initials: "SI",
    name: "Sneha Iyer",
    role: "Design",
    risk: 62,
    level: "Medium",
    color: "bg-amber-500",
    textColor: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400",
    reasons: [
      "Stressed mood 3 days",
      "Missed 2 deadlines",
      "Low peer feedback score",
    ],
  },
  {
    initials: "DK",
    name: "Dev Khatri",
    role: "Engineering",
    risk: 48,
    level: "Low",
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400",
    reasons: [
      "Leave request spike",
      "Reduced commits",
      "Below average OKR completion",
    ],
  },
  {
    initials: "MN",
    name: "Meera Nair",
    role: "Analytics",
    risk: 35,
    level: "Low",
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400",
    reasons: [
      "New joiner adjustment period",
      "Infrequent HR interactions",
    ],
  },
];

const AttritionRiskPrediction = ({ sidebarCollapsed }) => {
  return (
    <div
      className={`rounded-md bg-[#10111C] border border-[#1E2235] p-5
      flex flex-col gap-4 h-[441px] overflow-y-auto transition-all duration-300
      ${
        sidebarCollapsed
          ? "-ml-4 w-[calc(100%)]"
          : "-ml-5 w-[calc(100%)]"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white font-semibold text-md">
            Attrition Risk Prediction
          </h2>

          <p className="text-slate-400 text-xs">
            Employees likely to leave in next 30 days
          </p>
        </div>

        <TriangleAlert
          size={18}
          color="#ff3b3b"
          strokeWidth={2.5}
        />
      </div>

      {/* Employee List */}
      <div className="flex flex-col gap-3">
        {employees.map((emp, index) => (
          <div
            key={index}
            className="border border-[#22273b] bg-[#13141F]
            rounded-xl p-4 hover:border-indigo-500/30
            transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              {/* Employee Info */}
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full bg-[#171b35]
                  flex items-center justify-center text-xs
                  text-indigo-400 font-semibold"
                >
                  {emp.initials}
                </div>

                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {emp.name}
                  </h3>

                  <p className="text-slate-400 text-xs">
                    {emp.role}
                  </p>
                </div>
              </div>

              {/* Risk Info */}
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 rounded-full bg-[#171b35] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${emp.color}`}
                    style={{ width: `${emp.risk}%` }}
                  />
                </div>

                <span
                  className={`font-semibold text-xs ${emp.textColor}`}
                >
                  {emp.risk}%
                </span>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${emp.badge}`}
                >
                  {emp.level}
                </span>
              </div>
            </div>

            {/* Reasons */}
            <div className="flex flex-wrap gap-2 mt-4">
              {emp.reasons.map((reason, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-full text-[10px]
                  bg-[#12162d] text-slate-300"
                >
                  {reason}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttritionRiskPrediction;