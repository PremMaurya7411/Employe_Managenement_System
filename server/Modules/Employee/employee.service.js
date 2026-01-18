import EmployeeRepository from "./employee.repository.js";

class EmployeeService {
  async createEmployee(data) {
    return EmployeeRepository.create(data);
  }

  async getEmployees() {
    return EmployeeRepository.findAll();
  }

  async getEmployeeById(id) {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  async updateEmployee(id, data) {
    const employee = await EmployeeRepository.updateById(id, data);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  async deleteEmployee(id) {
    const employee = await EmployeeRepository.deleteById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }
}

export default new EmployeeService();