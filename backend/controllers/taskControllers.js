const Task = require("../models/Task");

// GET
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// POST
exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title
  });
  res.json(task);
};

// DELETE
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Supprimé" });
};

// PUT
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};