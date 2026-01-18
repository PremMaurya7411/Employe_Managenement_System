import express from 'express'
import cors from 'cors'
import authRoutes from './Modules/Auth/auth.routes.js'
import departmentRoutes from "./Modules/Department/department.routes.js";
import employeeRoutes from "./Modules/Employee/employee.routes.js";
import leaveRoutes from "./Modules/Leave/leave.routes.js";
import connectToDatabase from "./db/db.js";

connectToDatabase();
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true })); // for form data

app.use('/api/auth', authRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
const PORT = process.env.PORT || 5000;
const url = `http://localhost:${PORT}`;
app.listen(PORT, ()=> { 
    console.log(`Server is Running on port ${url}`);
})