// import express, { Express, Request, Response, NextFunction, urlencoded, json } from "express";
// // import helmet from "helmet";
// // import cookieParser from "cookie-parser";
// // import morgan from "morgan";
// // import cors from "cors";
// // import rateLimit from "express-rate-limit";
// // import expressListRoutes from "express-list-routes";
// // import bodyParser from "body-parser";
// import "express-async-errors";

// // import { corsOptions } from "./common/config/cors.ts";

// // import publicUserRouter from './src/routes/user/user.routes.js';
// // import publicProjectRouter from './src/routes/project/project.routes.public.js';
// // import privateProjectRouter from './src/routes/project/project.routes.private.js';
// // import authRouter from './src/routes/auth/auth.routes.js';

// // import expressErrorMiddleware from './middleware/errorMiddleware.js';

// // Load environment variables (ensure dotenv is configured in your project)
// import dotenv from "dotenv";
// dotenv.config();

// // Initialize the Express app
// const app: Express = express();

// // Rate Limiter Configuration
// // const limiter = rateLimit({
// //   windowMs: 60 * 1000, // 1 minute
// //   max: 100, // Limit each IP to 100 requests per window
// //   standardHeaders: true,
// //   legacyHeaders: false,
// // });

// // Middlewares
// // app.use(cookieParser());
// // app.use(express.json());
// // app.use(limiter);
// // app.use(morgan("dev"));
// // app.use(helmet());

// // Custom security headers middleware
// // app.use((req: Request, res: Response, next: NextFunction) => {
// //   res.set("X-XSS-Protection", "1; mode=block");
// //   res.set("X-Frame-Options", "deny");
// //   res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
// //   next();
// // });

// // app.use(helmet.hidePoweredBy());
// // app.use(json());
// // app.use(urlencoded({ extended: true }));
// // app.use(cors(corsOptions));

// // Endpoint shows Server Running
// app.get("/", (req: Request, res: Response) => {
//   res.json("Server is Running");
// });

// // Routes
// // app.use('/auth', authRouter);
// // app.use('/user', publicUserRouter);
// // app.use('/projects', publicProjectRouter);
// // app.use('/:friendlyId/projects', privateProjectRouter);

// // Error Middleware
// // app.use(expressErrorMiddleware);

import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import exampleRouter from "./routes/example.ts";
import { connectMongoDB } from "./common/config/mongoConnection.ts";
import { SECRETS } from "./common/config/config.ts";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";
const app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(limiter);

const PORT = SECRETS.port || 3000; // Use SECRETS instead of process.env

// Middlewares
app.use(express.json());

// Routes
app.use("/api/example", exampleRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express with TypeScript!");
});

// Start function
export const start = async (): Promise<void> => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log("✅ MongoDB connected");
      console.log("Available APIs:");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Failed to start server:", error.message);
    } else {
      console.error("❌ Failed to start server:", error);
    }
    process.exit(1);
  }
};
