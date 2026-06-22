import {
  Check,
  CircleX,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const EmployeeAllTask = ({
  data,
  index,
  completeTask,
  failedTask,
  reopenTask,
  acceptTask,
  rejectTask,
}) => {
  return (
    <div className="bg-[#090d1f] border border-gray-800 rounded-2xl p-7 min-h-[250px]">
      <h2 className="text-white text-3xl font-semibold mb-2">
        {data.title}
      </h2>

      <p className="text-slate-500 text-xl mb-6">
        {data.description}
      </p>

      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-3 flex-wrap">
          <span className="px-4 py-1 rounded-lg bg-white text-indigo-600 font-medium">
            {data.category}
          </span>

          {data.newTask && (
            <span className="px-4 py-1 rounded-lg bg-yellow-100 text-yellow-700 font-medium">
              New
            </span>
          )}

          {data.active && (
            <span className="px-4 py-1 rounded-lg bg-blue-100 text-blue-700 font-medium">
              In Progress
            </span>
          )}

          {data.completed && (
            <span className="px-4 py-1 rounded-lg bg-green-100 text-green-700 font-medium">
              Completed
            </span>
          )}

          {data.failed && (
            <span className="px-4 py-1 rounded-lg bg-red-100 text-red-700 font-medium">
              Failed
            </span>
          )}
        </div>

        <p className="text-slate-500 text-lg">
          Due : {data.date}
        </p>
      </div>

      {/* NEW TASK */}
      {data.newTask && (
        <div className="flex gap-3">
          <button
            onClick={() => acceptTask(index)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold text-2xl flex items-center justify-center gap-2"
          >
            <Check size={24} />
            Accept
          </button>

          <button
            onClick={() => rejectTask(index)}
            className="flex-1 border border-red-500 text-red-500 rounded-xl py-4 font-semibold text-2xl flex items-center justify-center gap-2"
          >
            <CircleX size={24} />
            Reject
          </button>
        </div>
      )}

      {/* ACTIVE TASK */}
      {data.active && (
        <div className="flex gap-3">
          <button
            onClick={() => completeTask(index)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold text-xl flex items-center justify-center gap-2"
          >
            <CheckCircle size={22} />
            Mark Complete
          </button>

          <button
            onClick={() => failedTask(index)}
            className="flex-1 border border-red-500 text-red-500 rounded-xl py-4 font-semibold text-xl flex items-center justify-center gap-2"
          >
            <AlertCircle size={22} />
            Mark Failed
          </button>
        </div>
      )}

      {/* COMPLETED */}
      {data.completed && (
        <button
          onClick={() => reopenTask(index)}
          className="w-full text-white font-semibold text-3xl mt-8"
        >
          Reopen
        </button>
      )}

      {/* FAILED */}
      {data.failed && (
        <button
          onClick={() => reopenTask(index)}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl py-4 font-semibold text-xl"
        >
          Retry Task
        </button>
      )}
    </div>
  );
};

export default EmployeeAllTask;