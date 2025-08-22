// import express from "express";
// import session from "express-session";
// import connectPgSimple from "connect-pg-simple";
// import passport from "passport";
// import { setupAuth } from "./auth.js";
// import { registerRoutes } from "./routes.js";
// import { setupVite } from "./vite.js";

// const app = express();

// // Body parsing middleware (must come before passport)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Session configuration
// const PgStore = connectPgSimple(session);

// app.use(
//   session({
//     store: new PgStore({
//       conString: process.env.DATABASE_URL,
//       createTableIfMissing: false, // We'll create it via migration
//       tableName: "sessions",
//     }),
//     secret: process.env.SESSION_SECRET || "africa-mechanize-dev-secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     },
//   })
// );

// // Setup authentication after session middleware
// await setupAuth();

// // Initialize passport after session
// app.use(passport.initialize());
// app.use(passport.session());

// const server = await registerRoutes(app);
// const vite = await setupVite(app, server);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
//   if (process.env.NODE_ENV !== "production") {
//     console.log("🔐 Authentication system initialized");
//   }
// });
