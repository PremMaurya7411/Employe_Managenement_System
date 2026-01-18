import { z } from "zod";
import mongoose from "mongoose";
import Employee from "../Employee/employee.model.js";

/**
 * Reusable async employee validator
 */
const employeeExists = async (employeeId) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return false;
  }

  const exists = await Employee.exists({ _id: employeeId });
  return !!exists;
};

/**
 * CREATE LEAVE
 */
export const createLeaveSchema = z.object({
  employee_id: z
    .string()
    .trim()
    .refine(
      (val) => mongoose.Types.ObjectId.isValid(val),
      "Invalid E ID"
    )
    .refine(async (val) => await employeeExists(val), {
      message: "Employee does not exist",
    }),
  leave_type: z.enum(["CL", "SL", "PL", "LOP"]),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  leave_duration: z.enum(["FULL_DAY", "HALF_DAY"]).optional(),
  half_day_type: z.enum(["AM", "PM"]).optional(),
  reason: z.string().trim().optional(),
});

/**
 * UPDATE LEAVE
 */
export const updateLeaveSchema = z.object({
  employee_id: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => val === undefined || mongoose.Types.ObjectId.isValid(val),
      "Invalid E ID"
    )
    .refine(
      async (val) => val === undefined || await employeeExists(val),
      { message: "Employee does not exist" }
    ),
  leave_type: z.enum(["CL", "SL", "PL", "LOP"]).optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  leave_duration: z.enum(["FULL_DAY", "HALF_DAY"]).optional(),
  half_day_type: z.enum(["AM", "PM"]).optional(),
  reason: z.string().trim().optional(),
});

/**
 * GET LEAVE (QUERY PARAMS)
 */
export const getLeaveSchema = z.object({
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
  sortBy: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});