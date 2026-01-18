export const createDepartmentDTO = (data) => {
  return {
    dep_name: data.dep_name?.trim(),
    description: data.description?.trim(),
  };
};

export const updateDepartmentDTO = (data) => {
  const payload = {};

  if (data.dep_name) payload.dep_name = data.dep_name.trim();
  if (data.description) payload.description = data.description.trim();

  return payload;
};
export const getDepartmentDTO = (query) => {
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