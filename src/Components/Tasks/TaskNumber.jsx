// TaskNumber.jsx
import { ClipboardList, CircleCheck, Clock, TriangleAlert } from "lucide-react";

const TaskNumber = ({ data }) => {
  return (
    <>
      <div className="flex  p-1 ml-10 mt-5 gap-2 overflow-hidden">

        <div className="h-29 w-70 border-1 flex flex-col border-[#1e2333] rounded-2xl hover:shadow-[0_2px_8px_#3b82f640] transition-all duration-300">
         <div className="p-3">
            <h1 className="h-8 w-8 flex justify-center items-center border-1 border-[#1e2333] rounded-md bg-[#1444e3]">
              <ClipboardList color="#60a5fa" strokeWidth={2} size={19} />
            </h1>
            <h1 className="ml-2 mt-2 text-3xl font-bold text-[#f1f5f9]">
              {data.taskNumber.total}
            </h1>
            <p className="font-medium mt-1 text-sm text-[#64748b]">TOTAL TASKS</p>
          </div>
        </div>

        <div className="h-29 w-70 border-1 hover:shadow-[0_2px_8px_#00ff7340] transition-all duration-300 border-[#1e2333] rounded-2xl">
          <div className="p-3">
            <h1 className="h-8 w-8 flex justify-center items-center border-1 border-[#1e2333] rounded-md bg-[#03764030]">
              <CircleCheck size={19} color="#44ff00" strokeWidth={2} />
            </h1>
            <h1 className="ml-2 mt-2 text-3xl font-bold text-[#f1f5f9]">
              {data.taskNumber.completed}
            </h1>
            <p className="font-medium mt-1 text-sm text-[#64748b]">COMPLETED</p>
          </div>
        </div>

        <div className="h-29 w-70 border-1 border-[#1e2333] hover:shadow-[0_2px_8px_#fbbf2440] transition-all duration-300 rounded-2xl">
          <div className="p-3">
            <h1 className="h-8 w-8 flex justify-center items-center border-1 border-[#1e2333] rounded-md bg-[#fadf6620]">
              <Clock size={19} color="#ffd500" strokeWidth={2} />
            </h1>
            <h1 className="ml-2 mt-2 text-3xl font-bold text-[#f1f5f9]">
              {data.taskNumber.inProgress}
            </h1>
            <p className="font-medium mt-1 text-sm text-[#64748b]">IN PROGRESS</p>
          </div>
        </div>

        <div className="h-29 w-70 border-1 border-[#1e2333] hover:shadow-[0_2px_8px_#ef444440] transition-all duration-300 rounded-2xl">
          <div className="p-3">
            <h1 className="h-8 w-8 flex justify-center items-center border-1 border-[#1e2333] rounded-md bg-[#fa666620]">
              <TriangleAlert size={19} color="#ff0000" strokeWidth={2} />
            </h1>
            <h1 className="ml-2 mt-2 text-3xl font-bold text-[#f1f5f9]">
              {data.taskNumber.failed}
            </h1>
            <p className="font-medium mt-1 text-sm text-[#64748b]">FAILED</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default TaskNumber;