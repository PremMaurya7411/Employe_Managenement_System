import logger from "../../utils/logger.js";
import { z } from "zod";
import mongoose from "mongoose";

export const createEmployeeDTO = (data) => ({
  first_name: data.first_name.trim(),
  last_name: data.last_name.trim(),
  email: data.email.trim().toLowerCase(),
  department: data.department, // ✅ DO NOT trim
});


export const updateEmployeeDTO = (data) => {
  const payload = {};

  if (data.first_name) payload.first_name = data.first_name.trim();
  if (data.last_name) payload.last_name = data.last_name.trim();
  if (data.email) payload.email = data.email.trim();
  if (data.phone) payload.phone = data.phone.trim();
  if (data.department) payload.department = data.department.trim();

  return payload;
};
export const getEmployeeDTO = (query) => {
  const filter = {};
  const options = {
    limit: parseInt(query.limit, 10) || 10,
    page: parseInt(query.page, 10) || 1,
    sortBy: query.sortBy || 'createdAt',
    order: query.order === 'desc' ? -1 : 1,
  };

  if (query.dep_name) {
    filter.dep_name = { $regex: query.dep_name, $options: 'i' };
  }

  return { filter, options };
};