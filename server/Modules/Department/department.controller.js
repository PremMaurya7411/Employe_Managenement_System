import departmentService from "./department.service.js";
import {
  createDepartmentDTO,
  updateDepartmentDTO,
} from "./department.dto.js";
import { handleError } from "../../utils/handleError.js";

class DepartmentController {
  async create(req, res) {
    try {
      const payload = createDepartmentDTO(req.body);
      const department = await departmentService.createDepartment(payload);
      res.status(201).json({ success: true, data: department });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async list(req, res) {
    try {
      const departments = await departmentService.getDepartments();
      res.json({ success: true, data: departments });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getById(req, res) {
    try {
      const department = await departmentService.getDepartmentById(req.params.id);
      res.json({ success: true, data: department });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      const payload = updateDepartmentDTO(req.body);
      const department = await departmentService.updateDepartment(
        req.params.id,
        payload
      );
      res.json({ success: true, data: department });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async delete(req, res) {
    try {
      await departmentService.deleteDepartment(req.params.id);
      res.json({
        success: true,
        message: "Department deleted successfully",
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default new DepartmentController();
