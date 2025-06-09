require("dotenv").config()

const mongoose = require("mongoose")
const db_url = process.env.DATABASE_URL



const connectDB = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

module.exports = connectDB;
