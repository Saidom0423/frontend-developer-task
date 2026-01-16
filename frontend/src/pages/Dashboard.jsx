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
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-md p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <div className="flex gap-2">
          <input
            className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new task"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Search */}
        <input
          className="border rounded px-3 py-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search tasks"
          onChange={e => setSearch(e.target.value)}
        />

        {/* Task List */}
        <ul className="mt-4">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center mt-6">
              No tasks yet. Add one above 👆
            </p>
          )}

          {tasks
            .filter(t =>
              t.title.toLowerCase().includes(search.toLowerCase())
            )
            .map(t => (
              <li
                key={t._id}
                className="border rounded p-3 mt-2 flex justify-between items-center hover:bg-gray-50"
              >
                <span className="text-gray-800">{t.title}</span>
                <button
                  onClick={() => deleteTask(t._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
