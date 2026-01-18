
import Employee from "./employee.model.js";

class EmployeeRepository {
  create(data) {
    return Employee.create(data);
  }


  findAll() {
    return Employee.find()
      .populate("department") 
      .sort({ createdAt: -1 });
  }

  findById(id) {
    return Employee.findById(id).populate("department");
  }

  // ..
  updateById(id, data) {
    return Employee.findByIdAndUpdate(id, data, { new: true });
  }

  deleteById(id) {
    return Employee.findByIdAndDelete(id);
  }
}

export default new EmployeeRepository();
