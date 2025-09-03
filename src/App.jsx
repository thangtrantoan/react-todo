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
      type: "abc",
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
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="todo-item">
              <div className="todo-item-name">{task.name}</div>
              <button
                className="todo-item-button"
                onClick={() => handleDeleteTask(task.id)}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <div className="todo-tasks-empty">No data</div>
        )}
      </div>
    </div>
  );
}

export default App;
