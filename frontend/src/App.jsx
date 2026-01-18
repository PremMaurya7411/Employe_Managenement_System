import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./protectedroute/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Employees from "./pages/Admin_Employees";
import Admin_Departments from "./pages/Admin_Departments";
import Admin_Leaves from "./pages/Admin_Leaves";
import Admin_Salary from "./pages/Admin_Salary";
import Admin_Settings from "./pages/Admin_Settings";
import DepartmentList from "./components/Department/DepartmentList";  
import AddDepartment from "./components/Department/AddDepartment";
import EditDepartment from "./components/Department/EditDepartment";
import { ToastContainer } from "react-toastify";
import AddEmployee from "./components/Empolyee/Addemployee";
import EditEmployee from "./components/Empolyee/EditEmployee";
function App() {
  return (
    <BrowserRouter>
         <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard with nested routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Admin_Departments />} />
          <Route path="leaves" element={<Admin_Leaves />} />
          <Route path="salary" element={<Admin_Salary />} />
          <Route path="settings" element={<Admin_Settings />} />
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} /> 
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} /> 

          <Route path="/admin-dashboard/add-employee" element={<AddEmployee />} />
          <Route path="/admin-dashboard/employee/:id" element={<EditEmployee />} />
        </Route>

        {/* Employee Dashboard */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
