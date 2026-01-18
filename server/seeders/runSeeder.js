import mongoose from "mongoose";
import connectToDatabase from "../db/db.js";
import seedAdminUser from "../Modules/User/user.seeder.js";

const runSeeder = async () => {
  try {
    await connectToDatabase();

    await seedAdminUser();

    console.log("🌱 Seeding completed");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

runSeeder();
