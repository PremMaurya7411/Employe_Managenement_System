import employeeService from "./employee.service.js";
import { createEmployeeDTO, updateEmployeeDTO } from "./employee.dto.js";
import departmentService from "../Department/department.service.js";
import { handleError } from "../../utils/handleError.js";

class EmployeeController {
  async create(req, res) {
    try {
      const dto = createEmployeeDTO(req.body);
      await departmentService.departmentExists(dto.department);
      const employee = await employeeService.createEmployee(dto);
      res.status(201).json({ success: true, data: employee });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async list(req, res) {
    try {
      const employees = await employeeService.getEmployees();
      res.json({ success: true, data: employees });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getById(req, res) {
    try {
      const employee = await employeeService.getEmployeeById(req.params.id);
      res.json({ success: true, data: employee });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      const payload = updateEmployeeDTO(req.body);
      const employee = await employeeService.updateEmployee(req.params.id, payload);
      res.json({ success: true, data: employee });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async delete(req, res) {
    try {
      await employeeService.deleteEmployee(req.params.id);
      res.json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default new EmployeeController();
