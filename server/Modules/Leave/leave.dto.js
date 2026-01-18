export const createLeaveDTO = (data) => {
  return {
    employee_id: data.employee_id,
    leave_type: data.leave_type,
    // map validated dates to schema fields
    start_datetime: data.start_date,
    end_datetime: data.end_date,
    leave_duration: data.leave_duration || "FULL_DAY",
    half_day_type: data.half_day_type,
    reason: data.reason ? data.reason.trim() : undefined,
  };
};

export const updateLeaveDTO = (data) => {
  const payload = {};

  if (data.employee_id !== undefined) payload.employee_id = data.employee_id;
  if (data.leave_type !== undefined) payload.leave_type = data.leave_type;
  if (data.start_date !== undefined) payload.start_datetime = data.start_date;
  if (data.end_date !== undefined) payload.end_datetime = data.end_date;
  if (data.leave_duration !== undefined) payload.leave_duration = data.leave_duration;
  if (data.half_day_type !== undefined) payload.half_day_type = data.half_day_type;
  if (data.reason !== undefined) payload.reason = data.reason.trim();

  return payload;
};

export const getLeaveDTO = (query) => {
  const filter = {};
  const options = {
    limit: parseInt(query.limit, 10) || 10,
    page: parseInt(query.page, 10) || 1,
    sortBy: query.sortBy || "createdAt",
    order: query.order === "desc" ? -1 : 1,
  };

  return { filter, options };
};