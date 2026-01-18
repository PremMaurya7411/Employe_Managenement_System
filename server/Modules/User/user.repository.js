
import User from "./user.model.js";
class UserRepository {
  findByEmail(email, includePassword = false) {
    const query = User.findOne({ email });
    if (includePassword) {
      return query.select("+password");
    }
    return query;
  }

  create(data) {
    return User.create(data);
  }

  findById(id) {
    return User.findById(id);
  }
}

export default new UserRepository();
