const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");


router.post("/add", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);


router.get("/get", taskController.getAllTasks);
router.get("/uploader/:userId", taskController.getTasksByUploader);
router.get("/assignee/:userId", taskController.getTasksByAssignee);

module.exports = router;
