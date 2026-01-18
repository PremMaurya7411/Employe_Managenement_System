import userRepository from "./user.repository.js";

class UserService {
  async createUser(data) {
    return await userRepository.create(data);
  }

  async getUserByEmail(email, includePassword = false) {
    return await userRepository.findByEmail(email, includePassword);
  }

  async getUserById(id) {
    return await userRepository.findById(id);
  }
}

export default new UserService();
