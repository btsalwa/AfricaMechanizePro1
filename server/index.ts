import express from "express";
import { registerRoutes } from "./routes.js";
import { setupVite } from "./vite.js";

const app = express();
const server = await registerRoutes(app);
const vite = await setupVite(app, server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});