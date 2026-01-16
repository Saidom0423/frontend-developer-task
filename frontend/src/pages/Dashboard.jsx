import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/tasks").then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!task.trim()) return;

    const res = await api.post("/tasks", { title: task });
    setTasks([...tasks, res.data]);
    setTask("");
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="New task"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-green-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <input
        className="border p-2 w-full mt-4"
        placeholder="Search tasks"
        onChange={e => setSearch(e.target.value)}
      />

      <ul className="mt-4">
        {tasks
          .filter(t =>
            t.title.toLowerCase().includes(search.toLowerCase())
          )
          .map(t => (
            <li
              key={t._id}
              className="border p-2 mt-2 flex justify-between items-center"
            >
              <span>{t.title}</span>
              <button
                onClick={() => deleteTask(t._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
