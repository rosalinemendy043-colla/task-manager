require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// TEST API
app.get("/", (req, res) => {
  res.send("API OK 🚀");
});

// GET tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ADD task

app.post("/tasks", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 AJOUTE ÇA

    const { title } = req.body;

    const result = await pool.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
      [title]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log("ERROR POST:", err); // 👈 AJOUTE ÇA
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.json({ message: "Supprimé" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/test", (req, res) => {
  res.send("Backend OK 🚀");
});
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});