import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import exampleRouter from "./routes/example.ts";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/example", exampleRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express with TypeScript!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log("Available APIs:");
});
