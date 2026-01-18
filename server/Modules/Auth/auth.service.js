  import userService from "../User/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  async login(email, password) {
    // Get user with password field
    const user = await userService.getUserByEmail(email, true);
    
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Check if user is active
    if (!user.is_active) {
      const error = new Error("Account is deactivated");
      error.statusCode = 403;
      throw error;
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}

export default new AuthService();

