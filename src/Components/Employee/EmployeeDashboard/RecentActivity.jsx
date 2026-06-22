import React from "react";
import {
  CheckCircle,
  DollarSign,
  Target,
  Heart,
} from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      title: "Task completed",
      subtitle: "Code Review",
      time: "2 hours ago",
      icon: <CheckCircle size={22} />,
      color: "text-green-400",
    },
    {
      title: "Leave approved",
      subtitle: "Casual Leave (Jun 20–22)",
      time: "1 day ago",
      icon: <CheckCircle size={22} />,
      color: "text-green-400",
    },
    {
      title: "Salary credited",
      subtitle: "May 2026 – ₹75,000",
      time: "3 days ago",
      icon: <DollarSign size={22} />,
      color: "text-emerald-400",
    },
    {
      title: "Goal updated",
      subtitle: "Q2 OKR Progress Review",
      time: "5 days ago",
      icon: <Target size={22} />,
      color: "text-amber-400",
    },
    {
      title: "Mood submitted",
      subtitle: "Feeling Great 😄",
      time: "1 week ago",
      icon: <Heart size={22} />,
      color: "text-pink-400",
    },
  ];

  return (
    <div className="bg-[#10111C] border border-[#1E2235] rounded-md h-auto overflow-y-auto p-5">
      <h2 className="text-white text-xl font-bold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-[#1f222985] border border-gray-800  rounded-md p-5 hover:border-gray-700 transition-all duration-300"
          >
            <div className="flex items-start justify-between h-10">
              <div className="flex items-start gap-4">
                <div className={`${activity.color} mt-1`}>
                  {activity.icon}
                </div>

                <div>
                  <h3 className="text-white text-md font-semibold">
                    {activity.title}
                  </h3>

                  <p className="text-gray-500 text-md ">
                    {activity.subtitle}
                  </p>
                </div>
              </div>

              <span className="text-gray-500 text-base text-sm whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;