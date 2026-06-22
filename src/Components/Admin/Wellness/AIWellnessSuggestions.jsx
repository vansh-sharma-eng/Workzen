// src/Components/Wellness/AIWellnessSuggestions.jsx

import { Heart } from "lucide-react";

const suggestions = [
  {
    icon: "🧘",
    text: "Encourage team to take 5-min breaks every 90 min",
  },
  {
    icon: "🚶",
    text: "Promote walking meetings for 1:1s",
  },
  {
    icon: "💬",
    text: "3 employees haven't checked in this week — follow up",
  },
  {
    icon: "🎉",
    text: "Team morale boost: recognize Priya Mehta's OKR completion",
  },
];

const AIWellnessSuggestions = ({ sidebarCollapsed }) => {
  return (
    <div
      className={`
        transition-all
        duration-300
        ${
          sidebarCollapsed
            ? "ml-2 w-[calc(100%-3.5rem)]"
            : "ml-0 w-[calc(100%-2.5rem)]"
        }
      `}
    >
      <div className="border border-[#1E2235] bg-[#10111C] rounded-md p-5 h-67.5  overflow-auto">
        <div className="flex items-center gap-2 mb-3">
          <Heart
            size={17}
            className="text-indigo-400"
          />

          <h2 className="text-white text-md font-bold">
            AI Wellness Suggestions
          </h2>
        </div>

        <div className="space-y-2">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="border border-[#1E2235] bg-[#10111C] rounded-md p-2 flex items-center gap-2"
            >
              <span className="text-md">
                {item.icon}
              </span>

              <p className="text-[#b7b6b6] text-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIWellnessSuggestions;