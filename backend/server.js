const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

// Routes
app.use("/tasks", taskRoutes);

// Serveur
app.listen(3000, () => console.log("Serveur lancé"));