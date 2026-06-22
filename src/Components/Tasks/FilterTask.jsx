const FilterTask = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "New", value: "newTask" },
    { label: "In Progress", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Failed", value: "failed" },
  ];

  return (
    <div className="flex flex-wrap gap-3 px-3 mt-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setActiveFilter(filter.value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
            ${
              activeFilter === filter.value
                ? "bg-indigo-500 text-white"
                : "bg-[#090d1f] border border-gray-800 text-gray-300"
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTask;