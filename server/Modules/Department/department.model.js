import mongoose from "mongoose";
import departmentSchema from "./department.schema.js";

const Department = mongoose.model("Department", departmentSchema);

export default Department;