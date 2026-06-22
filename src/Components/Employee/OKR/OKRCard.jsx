import { Plus } from "lucide-react";

const OKRCard = ({ goal }) => {
  const statusColor =
    goal.status === "On Track"
      ? "bg-green-100 text-green-700"
      : "bg-amber-100 text-amber-700";

  const progressColor =
    goal.status === "On Track"
      ? "bg-[#635BFF]"
      : "bg-[#F59E0B]";

  return (
    <div className="bg-[#16161f] border border-[#20263a]  rounded-md p-4">
      <h2 className="text-md font-semibold text-white mb-3">
        {goal.title}
      </h2>

      <div className="flex items-center text-xs gap-3 mb-5">
        <span
          className={`px-2 py-1 rounded-xl text-xs font-medium ${statusColor}`}
        >
          {goal.status}
        </span>

        <span className="text-[#7F8499]">
          Due : {goal.dueDate}
        </span>

        <span className="text-[#7F8499]">
          Assigned by: {goal.assignedBy}
        </span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-[#7F8499] text-sm">
          Overall Progress
        </span>

        <span className="text-white text-md font-bold">
          {goal.progress}%
        </span>
      </div>

      <div className="h-1 rounded-full bg-[#E5E7EB] overflow-hidden mb-5">
        <div
          className={`h-full rounded-full ${progressColor}`}
          style={{ width: `${goal.progress}%` }}
        />
      </div>

      <h3 className="text-white text-md font-semibold mb-4">
        Key Results
      </h3>

      <div className="space-y-4">
        {goal.keyResults.map((kr) => (
          <div key={kr.id}>
            <div className="flex gap-3 items-center mb-3">
              <div className="w-4 h-4 rounded border border-gray-500" />

              <p className="text-white text-md">
                {kr.title}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-1 rounded-full bg-[#E5E7EB] overflow-hidden">
                <div
                  className="h-full bg-[#635BFF] rounded-full"
                  style={{ width: `${kr.progress}%` }}
                />
              </div>

              <span className="text-[#7F8499] text-md">
                {kr.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-5 border border-[#232946] rounded-xl py-2 flex justify-center items-center gap-3 text-white text-md hover:bg-[#171C36] transition">
        <Plus size={19} />
        Add Update
      </button>
    </div>
  );
};

export default OKRCard;