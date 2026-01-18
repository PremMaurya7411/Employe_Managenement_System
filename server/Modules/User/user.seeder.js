import userService from "./user.service.js";

const seedAdminUser = async () => {
  try {
    const adminEmail = "Rakeshverma2102000@gmail.com";
    const existingAdmin = await userService.getUserByEmail(adminEmail);
    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }
    await userService.createUser({
      name: "System Admin",
      email: adminEmail,
      password: "Admin@123",
      role: "admin",
    });
    console.log("🚀 Admin user seeded successfully");
  } catch (error) {
    console.error("❌ Admin seeding failed:", error.message);
  }
};
export default seedAdminUser;
