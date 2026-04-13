import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const getTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    await axios.post("http://localhost:5000/tasks", { title });
    setTitle("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    getTasks();
  };

  return (
    <div className="container mt-5">
      <h2>Task Manager</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Ajouter</button>

      {tasks.map((task) => (
        <div key={task.id}>
          {task.title}
          <button onClick={() => deleteTask(task.id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default App;