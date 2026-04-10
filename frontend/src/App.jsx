import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(data => {
        setTasks([...tasks, data]);
        setTitle("");
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Ajouter</button>

      {tasks.map(task => (
        <div key={task._id}>
          {task.title}
          <button onClick={() => deleteTask(task._id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default App;