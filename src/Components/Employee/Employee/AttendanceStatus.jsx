const cards = [
  {
    title: "Present Days",
    value: 20,
  },
  {
    title: "Absent Days",
    value: 1,
  },
  {
    title: "Late Days",
    value: 1,
  },
  {
    title: "Attendance %",
    value: "95%",
  },
];

const AttendanceStats = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#10111C] border border-[#1E2235] rounded-2xl p-6"
        >
          <p className="text-slate-400 text-sm">
            {card.title}
          </p>

          <h2 className="text-4xl font-bold mt-6">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;
