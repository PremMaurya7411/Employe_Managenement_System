import { z } from "zod";

/**
 * LOGIN VALIDATION
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email format").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

