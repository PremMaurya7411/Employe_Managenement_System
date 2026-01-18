import Department from "./department.model.js";

class DepartmentRepository {
  create(data) {
    return Department.create(data);
  }

  findAll() {
    return Department.find().sort({ createdAt: -1 });
  }
  findById(id) {
    return Department.findById(id);
  }
   async exists(id) {
    return Department.exists({ _id: id });
  }

  updateById(id, data) {
    return Department.findByIdAndUpdate(id, data, { new: true });
  }

  deleteById(id) {
    return Department.findByIdAndDelete(id);
  }
}

export default new DepartmentRepository();
