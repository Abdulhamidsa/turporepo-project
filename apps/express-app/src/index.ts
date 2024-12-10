import express, { Express, Request, Response, NextFunction, urlencoded, json } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// import cors from 'cors';
import rateLimit from "express-rate-limit";
import expressListRoutes from "express-list-routes";
import bodyParser from "body-parser";
import "express-async-errors";

// import { connect } from './utils/db.js';
// import { SECRETS } from './utils/config.js';
// import corsOptions from './config/cors.js';

// import publicUserRouter from './src/routes/user/user.routes.js';
// import publicProjectRouter from './src/routes/project/project.routes.public.js';
// import privateProjectRouter from './src/routes/project/project.routes.private.js';
// import authRouter from './src/routes/auth/auth.routes.js';

// import expressErrorMiddleware from './middleware/errorMiddleware.js';

// Load environment variables (ensure dotenv is configured in your project)
import dotenv from "dotenv";
dotenv.config();

// Initialize the Express app
const app: Express = express();

// Rate Limiter Configuration
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(limiter);
app.use(morgan("dev"));
app.use(helmet());

// Custom security headers middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("X-XSS-Protection", "1; mode=block");
  res.set("X-Frame-Options", "deny");
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});

app.use(helmet.hidePoweredBy());
app.use(json());
app.use(urlencoded({ extended: true }));
// app.use(cors(corsOptions));

// Endpoint shows Server Running
app.get("/", (req: Request, res: Response) => {
  res.json("Server is Running");
});

// Routes
// app.use('/auth', authRouter);
// app.use('/user', publicUserRouter);
// app.use('/projects', publicProjectRouter);
// app.use('/:friendlyId/projects', privateProjectRouter);

// Error Middleware
// app.use(expressErrorMiddleware);

// Server Start Function
export const start = async (): Promise<void> => {
  try {
    // await connect();
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      if (SECRETS.node_env === process.env.NODE_ENV) {
        expressListRoutes(app);
      }
      console.log(`REST API on http://localhost:${port}/`);
    });
  } catch (e) {
    console.error("Failed to start server:", e);
    process.exit(1);
  }
};

// Export the app instance for testing
export default app;
