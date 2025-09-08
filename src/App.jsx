import React, { useState } from "react";
import { generateShortId } from "./utils/generateId";
import MainLayout from "./components/layout";
import { RouterProvider } from "react-router-dom";
import router from "./routers";

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
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
