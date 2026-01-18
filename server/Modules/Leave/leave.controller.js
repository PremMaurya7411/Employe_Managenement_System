import LeaveService from "./leave.service.js";
import {
  createLeaveDTO,
  updateLeaveDTO,
} from "./leave.dto.js";
import {
  createLeaveSchema,
  updateLeaveSchema,
} from "./leave.validation.js";
import { handleError } from "../../utils/handleError.js";

class LeaveController {
  // CREATE
  async create(req, res) {
    try {
      const parsedBody = await createLeaveSchema.parseAsync(req.body);
      const payload = createLeaveDTO(parsedBody);

      const leave = await LeaveService.createLeave(payload);
      res.status(201).json({ success: true, data: leave });
    } catch (error) {
      return handleError(res, error);
    }
  }

  // READ ALL
  async list(req, res) {
    try {
      const leaves = await LeaveService.getLeaves();
      res.json({ success: true, data: leaves });
    } catch (error) {
      return handleError(res, error);
    }
  }

  // READ ONE
  async getById(req, res) {
    try {
      const leave = await LeaveService.getLeaveById(req.params.id);
      res.json({ success: true, data: leave });
    } catch (error) {
      return handleError(res, error);
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const parsedBody = await updateLeaveSchema.parseAsync(req.body);
      const payload = updateLeaveDTO(parsedBody);

      const leave = await LeaveService.updateLeave(req.params.id, payload);
      res.json({ success: true, data: leave });
    } catch (error) {
      return handleError(res, error);
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      await LeaveService.deleteLeave(req.params.id);
      res.json({ success: true, message: "Leave deleted successfully" });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default new LeaveController();