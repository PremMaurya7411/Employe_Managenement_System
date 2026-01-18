import mongoose from "mongoose";
import employeeSchema from "./employee.schema.js";
const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;