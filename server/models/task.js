const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "assigned", "cancelled"],
      default: "open",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    category: {
      type: String,
      enum: ["writing", "design", "development", "marketing", "other"],
      default: "other",
    },
    stars: {
      type: Number,
    },
    review: {
      type: String,
    },

    proposals: [
      {
        freelancer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        message: String,
        bid: Number,
        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
