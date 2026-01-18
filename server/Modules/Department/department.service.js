import departmentRepository from "./department.repository.js";

class DepartmentService {
  async createDepartment(data) {
    return departmentRepository.create(data);
  }

  async getDepartments() {
    return departmentRepository.findAll();
  }

  async getDepartmentById(id) {
    const department = await departmentRepository.findById(id);
    if (!department) {
      throw new Error("Department not found");
    }
    return department;
  }
  // async 

    /**
   * Check only existence (lightweight, reusable)
   */
  async departmentExists(id) {
    const exists = await departmentRepository.exists(id);
    if (!exists) {
      throw new Error("Department not found");
    }
    return true;
  }

  async updateDepartment(id, data) {
    const department = await departmentRepository.updateById(id, data);
    if (!department) {
      throw new Error("Department not found");
    }
    return department;
  }

  async deleteDepartment(id) {
    const department = await departmentRepository.deleteById(id);
    if (!department) {
      throw new Error("Department not found");
    }
    return department;
  }
}

export default new DepartmentService();
