import { db } from "./db.js";
import { adminUsers } from "../shared/schema.js";
import bcrypt from "bcryptjs";

async function seed() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await db.insert(adminUsers).values({
    username: "admin",
    email: "admin@africamechanize.org",
    passwordHash,
    fullName: "Default Admin",
    role: "super_admin",
  });

  console.log("✅ Default admin user seeded.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
