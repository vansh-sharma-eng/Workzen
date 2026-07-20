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
  const allTasks = data?.tasks || [];

  const filteredTasks = allTasks.filter((task) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "newTask") return task.newTask;
    if (activeFilter === "active") return task.active;
    if (activeFilter === "completed") return task.completed;
    if (activeFilter === "failed") return task.failed;

    return true;
  });

  return (
    <div className="mt-6 px-8">
      {filteredTasks.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-slate-500 text-lg">No tasks found.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {filteredTasks.map((task) => (
            <EmployeeAllTask
              key={task.id}
              data={task}
              completeTask={completeTask}
              failedTask={failedTask}
              reopenTask={reopenTask}
              acceptTask={acceptTask}
              rejectTask={rejectTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeTask;