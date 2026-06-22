// StatsCards.jsx
import React, { useContext } from "react";
import { Users, UserRoundCheck, Clock, BriefcaseBusiness } from "lucide-react";
import { AuthContext } from "../Context/AuthProvider";

const StatsCards = () => {
  const { userData } = useContext(AuthContext);
  const employees = userData.employeesData || [];

  const totalEmployees = employees.length;
  const departments = new Set(employees.map((e) => e.department)).size;
  const activeNow = employees.filter((e) => e.isActive === true && e.leaveStatus !== "approved").length;
  const onLeave = employees.filter((e) => e.leaveStatus === "approved").length;

  const cards = [
    {
      icon: <Users size={18} />,
      number: totalEmployees,
      title: "TOTAL EMPLOYEES",
      iconBg: "bg-[#1e2333]",
      iconColor: "text-[#60a5fa]",
    },
    {
      icon: <UserRoundCheck size={18} />,
      number: activeNow,
      title: "ACTIVE NOW",
      iconBg: "bg-[#0f2e2b]",
      iconColor: "text-[#14f195]",
    },
    {
      icon: <Clock size={18} />,
      number: onLeave,
      title: "ON LEAVE",
      iconBg: "bg-[#3b2a12]",
      iconColor: "text-[#fbbf24]",
    },
    {
      icon: <BriefcaseBusiness size={18} />,
      number: departments,
      title: "DEPARTMENTS",
      iconBg: "bg-[#1e2333]",
      iconColor: "text-[#93c5fd]",
    },
  ];

  return (
    <div className="flex gap-2 px-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex h-18 w-62 items-center p-4 border border-[#1e2333] rounded-2xl bg-[#151822] gap-3 shadow-lg"
        >
          <div className={`h-11 w-11 rounded-xl flex justify-center items-center ${card.iconBg} ${card.iconColor}`}>
            {card.icon}
          </div>
          <div>
            <h1 className="font-bold text-[#f1f5f9] text-3xl leading-none">{card.number}</h1>
            <h5 className="text-xs tracking-wide text-[#64748b] mt-1">{card.title}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;