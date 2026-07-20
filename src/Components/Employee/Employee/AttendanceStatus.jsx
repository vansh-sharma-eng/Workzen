const cards = [
  { key: "present", title: "Present Days" },
  { key: "absent", title: "Absent Days" },
  { key: "late", title: "Late Days" },
  { key: "percent", title: "Attendance %" },
];

const AttendanceStats = ({ stats, loading }) => {
  const safe = stats || { present: 0, absent: 0, late: 0, percent: "—" };

  return (
    <div className="grid grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.key}
          className="bg-[#10111C] border border-[#1E2235] rounded-2xl p-6"
        >
          <p className="text-slate-400 text-sm">
            {card.title}
          </p>

          <h2 className="text-4xl font-bold mt-6">
            {loading ? "…" : card.key === "percent" ? `${safe.percent}%` : safe[card.key]}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;
