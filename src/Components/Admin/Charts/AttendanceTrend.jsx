import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", present: 148, late: 147, absent: 149 },
  { day: "Tue", present: 144, late: 143, absent: 145 },
  { day: "Wed", present: 152, late: 151, absent: 153 },
  { day: "Thu", present: 146, late: 145, absent: 147 },
  { day: "Fri", present: 141, late: 140, absent: 142 },
  { day: "Sat", present: 65, late: 64, absent: 66 },
  { day: "Sun", present: 18, late: 17, absent: 19 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-2xl">
      <p className="text-white font-medium mb-3">
        {label}
      </p>

      <div className="space-y-2 text-sm">
        <p className="text-[#6366F1]">
          Present: {payload[0]?.value}
        </p>

        <p className="text-[#10B981]">
          Late: {payload[1]?.value}
        </p>

        <p className="text-[#EF4444]">
          Absent: {payload[2]?.value}
        </p>
      </div>
    </div>
  );
};

const AttendanceTrend = () => {
  return (
    <div className="bg-[#13141F] border border-[#1A2035] rounded-xl p-6 h-[320px]">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white text-sm font-semibold">
            Attendance Trend
          </h2>

          <p className="text-[#94A3B8] text-[10px] mt-1">
            Last 7 days
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
            <span className="text-[#CBD5E1] text-xs">
              Present
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[#CBD5E1] text-xs">
              Late
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-[#CBD5E1] text-xs">
              Absent
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={200}
>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="#1A2035"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#CBD5E1",
              fontSize: 14,
            }}
          />

          <YAxis
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#CBD5E1",
              fontSize: 13,
            }}
          />

          <Tooltip
            cursor={{
              stroke: "#334155",
              strokeDasharray: "4 4",
            }}
            content={<CustomTooltip />}
          />

          <Line
            type="natural"
            dataKey="present"
            stroke="#6366F1"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              fill: "#6366F1",
              strokeWidth: 0,
            }}
          />

          <Line
            type="natural"
            dataKey="late"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />

          <Line
            type="natural"
            dataKey="absent"
            stroke="#EF4444"
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceTrend;