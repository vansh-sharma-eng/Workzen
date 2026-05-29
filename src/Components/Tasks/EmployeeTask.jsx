// EmployeeTask.jsx
import EmployeeAllTask from "./EmployeeAllTask";

const EmployeeTask = ({
  data,
  activeFilter,
  completeTask,
  failedTask,
  reopenTask,
  acceptTask,
  rejectTask,
}) => {
  const indexedTasks = data.tasks.map((task, index) => ({ task, index }));

  const filteredTasks = indexedTasks.filter(({ task }) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return task.active;
    if (activeFilter === "completed") return task.completed;
    if (activeFilter === "failed") return task.failed;
    if (activeFilter === "newTask") return task.newTask;
    return true;
  });

  return (
    <div className="flex flex-wrap gap-4 mt-5 ml-44">
      {filteredTasks.length === 0 && (
        <p className="text-[#64748b] ml-110 mt-30">No tasks found.</p>
      )}
      {filteredTasks.map(({ task, index }) => (
        <EmployeeAllTask
          key={index}
          data={task}
          index={index}
          completeTask={completeTask}
          failedTask={failedTask}
          reopenTask={reopenTask}
          acceptTask={acceptTask}
          rejectTask={rejectTask}
        />
      ))}
    </div>
  );
};

export default EmployeeTask;