<<<<<<< HEAD
import {
  Check,
  CircleX,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

=======
// EmployeeAllTask.jsx
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
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
<<<<<<< HEAD
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
=======
    <div className="w-[32%] h-auto rounded-2xl p-4 text-[#f1f5f9] bg-[#151822] border border-[#1e2333] shadow-lg transition-all duration-300 hover:border-[#3b82f6]/30">
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-sm font-bold leading-5 text-[#f1f5f9]">
          {data.title}
        </h1>
        <span className="text-[10px] whitespace-nowrap bg-[#1e2333] px-2 py-1 rounded-lg text-[#93c5fd]">
          {data.date}
        </span>
      </div>

      <p className="mt-4 text-sm text-[#64748b] leading-6">{data.description}</p>

      <div className="mt-2 flex items-center gap-2 flex-wrap text-sm text-[#64748b]">
        Category :-
        <span className="py-1 text-[14px] text-[#93c5fd]">{data.category}</span>
      </div>

      <div className="mt-5 flex gap-2">
        {data.newTask && (
          <>
            <button
              onClick={() => acceptTask(index)}
              className="flex-1 h-9 text-sm rounded-xl bg-[#032d27] text-[#00f5b4] border border-[#006c57] hover:scale-105 transition-all"
            >
              Accept
            </button>
          </>
        )}

        {data.active && (
          <>
            <button
              onClick={() => completeTask(index)}
              className="flex-1 h-9 text-sm rounded-xl bg-[#032d27] text-[#00f5b4] border border-[#006c57] hover:scale-105 transition-all"
            >
              Complete
            </button>
            <button
              onClick={() => failedTask(index)}
              className="flex-1 h-9 text-sm rounded-xl bg-[#33111a] text-[#ff6b6b] border border-[#6f2b3a] hover:scale-105 transition-all"
            >
              Failed
            </button>
          </>
        )}

        {data.completed && (
          <button className="w-full h-9 text-sm rounded-xl bg-[#032d27] text-[#00f5b4] border border-[#006c57]">
            Completed
          </button>
        )}

        {data.failed && (
          <button
            onClick={() => reopenTask(index)}
            className="w-full h-9 text-sm rounded-xl bg-[#0d1a3a] text-[#60a5fa] border border-[#1e3a6e] hover:scale-105 transition-all"
          >
            Reopen Task
          </button>
        )}
      </div>
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
    </div>
  );
};

export default EmployeeAllTask;