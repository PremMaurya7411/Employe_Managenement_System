import authService from "./auth.service.js";
import { loginDTO } from "./auth.dto.js";
import { loginSchema } from "./auth.validation.js";
import { handleError } from "../../utils/handleError.js";

class AuthController {
  async login(req, res) {
    try {
      const parsedBody = await loginSchema.parseAsync(req.body);
      const payload = loginDTO(parsedBody);
      const result = await authService.login(payload.email, payload.password);
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default new AuthController();

