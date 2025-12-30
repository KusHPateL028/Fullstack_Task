import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import indexRouter from "./routes/index.js";

const app = express();

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api", indexRouter);

app.use(errorHandler);

export default app;