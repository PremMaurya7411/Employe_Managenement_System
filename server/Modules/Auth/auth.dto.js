export const loginDTO = (data) => ({
  email: data.email.trim().toLowerCase(),
  password: data.password,
});

