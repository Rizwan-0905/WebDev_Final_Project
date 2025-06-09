const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/signup", userController.makeUser);
router.put("/update/:userName", userController.updateUser);

module.exports = router;
