import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    dep_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default departmentSchema;
