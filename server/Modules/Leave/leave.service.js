import LeaveRepository from "./leave.repository.js";

class LeaveService {
  async createLeave(data) {
    return LeaveRepository.create(data);
  }

  async getLeaves() {
    return LeaveRepository.findAll();
  }

  async getLeaveById(id) {
    const leave = await LeaveRepository.findById(id);
    if (!leave) {
      throw new Error("Leave not found");
    }
    return leave;
  }

  async updateLeave(id, data) {
    const leave = await LeaveRepository.updateById(id, data);
    if (!leave) {
      throw new Error("Leave not found");
    }
    return leave;
  }

  async deleteLeave(id) {
    const leave = await LeaveRepository.deleteById(id);
    if (!leave) {
      throw new Error("Leave not found");
    }
    return leave;
  }
}

export default new LeaveService();