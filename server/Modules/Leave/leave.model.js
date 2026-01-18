import mongoose from "mongoose";
import leaveSchema from "./leave.schema.js";
const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;