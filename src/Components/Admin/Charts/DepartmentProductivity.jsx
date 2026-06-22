import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const data = [
  {
    department: "Engineering",
    score: 92,
    color: "#6366F1",
  },
  {
    department: "HR",
    score: 78,
    color: "#10B981",
  },
  {
    department: "Sales",
    score: 85,
    color: "#F59E0B",
  },
  {
    department: "Marketing",
    score: 74,
    color: "#EF4444",
  },
  {
    department: "Finance",
    score: 88,
    color: "#8B5CF6",
  },
];

const DepartmentProductivity = () => {
  return (
    <div className="bg-[#13141F] border border-[#1E2337] rounded-xl p-5  h-[320px]">
      <div className="">
        <h2 className="text-white text-[14px] font-semibold">
          Department Productivity
        </h2>

        <p className="text-[#94A3B8] text-[9px]">
          Performance score by department
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}  style={{ outline: "none" }}className="h-10 mt-5">
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
  itemStyle={{
    color: "#FFFFFF", 
  }}
  labelStyle={{
    color: "#CBD5E1", 
  }}
   cursor={{
    fill: "#1E2337",
    opacity: 0.9,
  }}
/>

          <Bar
            dataKey="score"
           barSize={45}
            radius={[8, 8, 0, 0]
              
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className=" mb-2 flex flex-wrap gap-4">
        {data.map((item) => (
          <div
            key={item.department}
            className="flex items-center gap-2"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <span className="text-xs text-[#CBD5E1]">
              {item.department}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentProductivity;