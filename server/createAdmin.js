#!/usr/bin/env node
import bcrypt from "bcryptjs";
import { storage } from "./storage.js";

async function createDefaultAdmin() {
  try {
    const passwordHash = await bcrypt.hash("admin123", 10);
    
    const adminData = {
      username: "admin",
      email: "admin@africamechanize.org", 
      passwordHash,
      fullName: "System Administrator",
      role: "super_admin",
      isActive: true
    };

    const existingAdmin = await storage.getAdminUser("admin");
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    await storage.createAdminUser(adminData);
    console.log("✅ Default admin user created successfully");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Please change the password after first login");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  }
}

createDefaultAdmin();