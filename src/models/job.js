const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxlength: 70,
    },
    position: {
      type: String,
      required: [true, "Please provide a position name"],
      maxlength: 120,
    },
    status: {
      type: String,
      required: [true, "Please provide a status"],
      default: "pending",
      enum: {
        values: ["selected", "not selected", "in consideration", "pending"],
        message: "{VALUE} is not provided",
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
