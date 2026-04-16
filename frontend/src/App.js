import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const getTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      console.log("DATA:", res.data);
      setTasks(res.data);
    } catch (err) {
      console.log("ERROR AXIOS:", err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post("/tasks", { title });
      setTitle("");
      getTasks();
    } catch (err) {
      console.log("ERROR ADD:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      getTasks();
    } catch (err) {
      console.log("ERROR DELETE:", err.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#d2b48c",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>

        <h2 className="text-center mb-4">Task Manager</h2>

        {/* INPUT + BUTTON */}
        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Entrer une tâche"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask} className="btn btn-success">
            Ajouter
          </button>
        </div>

        {/* LISTE DES TÂCHES */}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="d-flex justify-content-between align-items-center mb-2"
          >
            <span>{task.title}</span>

            <button
              onClick={() => deleteTask(task.id)}
              className="btn btn-danger btn-sm"
            >
              X
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;