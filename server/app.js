const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./config/db");

const PORT = process.env.port;

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ message: "servvice works" });
});

app.listen(PORT, () => {
  console.log(`runing on port ${PORT}`);
});
