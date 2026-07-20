// TaskNumber.jsx

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
      value: data?.taskNumber?.total || 0,
      subtitle: `${data?.taskNumber?.completed || 0} completed`,
      icon: <ListChecks size={20} color="#60a5fa" strokeWidth={2} />,
      shadow: "hover:shadow-[0_4px_12px_#3b82f640]",
    },
    {
      title: "Completed",
      value: data?.taskNumber?.completed || 0,
      subtitle: "Tasks finished",
      icon: <CircleCheck size={20} color="#44ff00" strokeWidth={2} />,
      shadow: "hover:shadow-[0_4px_12px_#00ff7340]",
    },
    {
      title: "In Progress",
      value: data?.taskNumber?.inProgress || 0,
      subtitle: "Active tasks",
      icon: <Clock size={20} color="#ffd500" strokeWidth={2} />,
      shadow: "hover:shadow-[0_4px_12px_#fbbf2440]",
    },
    {
      title: "Failed",
      value: data?.taskNumber?.failed || 0,
      subtitle: "Need attention",
      icon: <TriangleAlert size={20} color="#ff0000" strokeWidth={2} />,
      shadow: "hover:shadow-[0_4px_12px_#ef444440]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`border border-[#1c2237] bg-[#13141F] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 ${card.shadow}`}
        >
          <div className="flex justify-between items-start">
            <p className="text-[#64748b] text-sm font-medium">
              {card.title}
            </p>
            {card.icon}
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-bold text-[#f1f5f9]">
              {card.value}
            </h1>
          </div>

          <p className="text-[#64748b] mt-3 text-sm">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskNumber;