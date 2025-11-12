import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import skillsRoutes from "./routes/skills.routes.js";
import timeRoutes from "./routes/time.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";

await connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.json({ ok: true, app: "dev-skill-tracker" }));
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/time", timeRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
