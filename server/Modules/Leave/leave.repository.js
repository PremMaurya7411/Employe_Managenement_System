import Leave from "./leave.model.js";

class LeaveRepository {
  create(data) {
    return Leave.create(data);
  }

  findAll() {
    return Leave.find()
      .populate("employee_id")
      .sort({ createdAt: -1 });
  }

  findById(id) {
    return Leave.findById(id).populate("employee_id");
  }

  updateById(id, data) {
    return Leave.findByIdAndUpdate(id, data, { new: true })
      .populate("employee_id");
  }

  deleteById(id) {
    return Leave.findByIdAndDelete(id);
  }
}

export default new LeaveRepository();