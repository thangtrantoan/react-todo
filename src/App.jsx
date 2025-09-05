import React, { useState } from "react";
import "./App.css";
import { generateShortId } from "./utils/generateId";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = (e) => {
    const data = {
      id: generateShortId(),
      status: "backlog", // completed
      name: newTask,
      timeCreate: Date.now(),
    };
    if (e.key === "Enter" && newTask.trim()) {
      setTasks([data, ...tasks]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (e) => {
    const data = tasks.filter((i) => i.id !== e);
    setTasks(data);
  };

  const handleChangeStatus = (id) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === "completed" ? "backlog" : "completed",
          }
        : task
    );
    setTasks(updated);
  };

  return (
    <div className="todo-container">
      <div>
        <input
          className="todo-input"
          placeholder="Enter your task"
          onKeyDown={handleCreateTask}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
      <div className="todo-tasks">
        {/* Backlog Tasks */}
        <h3>Backlog</h3>
        {tasks.filter((t) => t.status === "backlog").length > 0 ? (
          tasks
            .filter((t) => t.status === "backlog")
            .map((task) => (
              <div key={task.id} className="todo-item">
                <div className="todo-item-name">{task.name}</div>
                {/* <button
                  className={
                    task.status === "completed"
                      ? "todo-item-status todo-item-status-completed"
                      : "todo-item-status todo-item-status-backlog"
                  }
                  onClick={() => handleChangeStatus(task.id)}
                >
                  Mark as Done
                </button> */}
                <input type="checkbox" checked={task.status === "completed"} onChange={() => handleChangeStatus(task.id)} />
                <button
                  className="todo-item-button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  x
                </button>
              </div>
            ))
        ) : (
          <div className="todo-tasks-empty">No backlog tasks</div>
        )}

        {/* Completed Tasks */}
        <h3>Completed</h3>
        {tasks.filter((t) => t.status === "completed").length > 0 ? (
          tasks
            .filter((t) => t.status === "completed")
            .map((task) => (
              <div key={task.id} className="todo-item">
                <div className="todo-item-name">{task.name}</div>
                {/* <button
                  className={
                    task.status === "completed"
                      ? "todo-item-status todo-item-status-completed"
                      : "todo-item-status todo-item-status-backlog"
                  }
                  onClick={() => handleChangeStatus(task.id)}
                >
                  {task.status}
                </button> */}
                <input type="checkbox" checked={task.status === "completed"} onChange={() => handleChangeStatus(task.id)} />
                <button
                  className="todo-item-button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  x
                </button>
              </div>
            ))
        ) : (
          <div className="todo-tasks-empty">No completed tasks</div>
        )}
      </div>
    </div>
  );
}

export default App;
