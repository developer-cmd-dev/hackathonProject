import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.ts";
import authRoutes from "./routes/auth.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = Number(process.env.PORT ?? 8080);

console.log(`Google authentication configured: ${Boolean(process.env.GOOGLE_CLIENT_ID)}`);

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend API" });
});

app.use("/api/auth", authRoutes);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof SyntaxError) {
    return res.status(400).json({ message: "Request body must be valid JSON" });
  }
  return res.status(500).json({ message: "Internal server error" });
});

connectDB().catch((error) => {
  console.error("Database connection failed:", error);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;