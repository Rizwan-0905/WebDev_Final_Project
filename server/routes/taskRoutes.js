const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");


router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);


router.get("/tasks", taskController.getAllTasks);
router.get("/tasks/uploader/:userId", taskController.getTasksByUploader);
router.get("/tasks/assignee/:userId", taskController.getTasksByAssignee);

module.exports = router;
