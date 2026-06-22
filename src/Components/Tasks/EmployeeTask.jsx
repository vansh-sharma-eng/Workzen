<<<<<<< HEAD
=======
// EmployeeTask.jsx
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
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
<<<<<<< HEAD
  const indexedTasks = data.tasks.map((task, index) => ({
    task,
    index,
  }));

  const filteredTasks = indexedTasks.filter(({ task }) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "newTask") return task.newTask;
    if (activeFilter === "active") return task.active;
    if (activeFilter === "completed") return task.completed;
    if (activeFilter === "failed") return task.failed;
=======
  const indexedTasks = data.tasks.map((task, index) => ({ task, index }));

  const filteredTasks = indexedTasks.filter(({ task }) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return task.active;
    if (activeFilter === "completed") return task.completed;
    if (activeFilter === "failed") return task.failed;
    if (activeFilter === "newTask") return task.newTask;
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
    return true;
  });

  return (
<<<<<<< HEAD
    <div className="mt-6 px-8">
      {filteredTasks.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-slate-500 text-lg">
            No tasks found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
      )}
=======
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
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
    </div>
  );
};

export default EmployeeTask;