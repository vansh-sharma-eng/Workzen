import React from "react";
import { Plus } from "lucide-react";

const TaskHeader = ({ view, setView }) => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
      <div className="flex flex-wrap gap-3">
        {["All", "To Do", "In Progress", "In Review", "Done"].map((tab) => (
          <button
            key={tab}
            className={`px-2 py-1 rounded-xl border transition-all duration-300 text-sm font-medium
              ${
                tab === "All"
                  ? "bg-white text-black border-white"
                  : "bg-[#14151c] border-[#272727] text-white hover:border-gray-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center bg-[#1b1b1b] border border-[#272727] rounded-md text-sm p-1">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded-md transition-all font-medium
              ${
                view === "list"
                  ? "bg-[#0f0f0f] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
          >
            List
          </button>

          <button
            onClick={() => setView("board")}
            className={`px-3 py-1 rounded-md text-sm transition-all font-medium
              ${
                view === "board"
                  ? "bg-[#0f0f0f] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
          >
            Board
          </button>
        </div>


        <button className="flex items-center gap-1 bg-white text-black px-3 py-1.5 rounded-md font-semibold hover:bg-gray-200 transition-all">
          <Plus size={22} />
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TaskHeader;