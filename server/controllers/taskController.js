const Task = require("../models/task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, budget, deadline, postedBy, category } =
      req.body;

    const newTask = await Task.create({
      title,
      description,
      budget,
      deadline,
      postedBy,
      category,
    });

    res.status(201).json({ success: true, task: newTask });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: err.message,
    });
  }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({ success: true, task: updatedTask });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: err.message,
    });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: err.message,
    });
  }
};

// Get all tasks (optionally filter by status or category)
exports.getAllTasks = async (req, res) => {
  try {
    const filters = {};

    if (req.query.status) filters.status = req.query.status;
    if (req.query.category) filters.category = req.query.category;

    const tasks = await Task.find(filters)
      .populate("postedBy", "name userName")
      .populate("assignedTo", "name userName")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: err.message,
    });
  }
};

// Get tasks posted by a specific user (Uploader)
exports.getTasksByUploader = async (req, res) => {
  try {
    const userId = req.params.userId;

    const tasks = await Task.find({ postedBy: userId })
      .populate("assignedTo", "name userName")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch uploader's tasks",
      error: err.message,
    });
  }
};

// Get tasks assigned to a specific user (Freelancer)
exports.getTasksByAssignee = async (req, res) => {
  try {
    const freelancerId = req.params.userId;

    const tasks = await Task.find({ assignedTo: freelancerId })
      .populate("postedBy", "name userName")
      .sort({ deadline: 1 }); // Soonest deadlines first

    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned tasks",
      error: err.message,
    });
  }
};
