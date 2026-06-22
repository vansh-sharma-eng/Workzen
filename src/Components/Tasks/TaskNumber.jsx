// TaskNumber.jsx
<<<<<<< HEAD
import {
  ListChecks,
  CircleCheck,
  Clock,
  TriangleAlert,
} from "lucide-react";

const TaskNumber = ({ data }) => {
  const cards = [
    {
      title: "Tasks Today",
      value: data.taskNumber.total,
      subtitle: `${data.taskNumber.completed} completed`,
      icon: <ListChecks size={20} color="#60a5fa" strokeWidth={2} />,
      shadow: "hover:shadow-[0_4px_12px_#3b82f640]",
    },
    {
      title: "Completed",
      value: data.taskNumber.completed,
      subtitle: "Tasks finished",
      icon: <CircleCheck size={20} color="#44ff00" strokeWidth={2} />,
      shadow: "hover:shadow-[0_4px_12px_#00ff7340]",
    },
    {
      title: "In Progress",
      value: data.taskNumber.inProgress,
      subtitle: "Active tasks",
      icon: <Clock size={20} color="#ffd500" strokeWidth={2} />,
      shadow: "hover:shadow-[0_4px_12px_#fbbf2440]",
    },
    {
      title: "Failed",
      value: data.taskNumber.failed,
      subtitle: "Need attention",
      icon: <TriangleAlert size={20} color="#ff0000" strokeWidth={2} />,
      shadow: "hover:shadow-[0_4px_12px_#ef444440]",
    },
  ];

  return (
    <div className="w-[100%]   grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`h-30 w-60 border
                border-[#1c2237]
                bg-[#13141F] rounded-md p-5 flex flex-col justify-between transition-all duration-300 ${card.shadow}`}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <p className="text-[#64748b] text-md font-medium">
              {card.title}
            </p>
            {card.icon}
          </div>

          {/* Number */}
          <div>
            <h1 className="text-2xl font-bold text-[#f1f5f9]">
              {card.value}
            </h1>
          </div>

          {/* Footer */}
          <p className="text-[#64748b] mt-3 text-sm">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
=======
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
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
  );
};

export default TaskNumber;