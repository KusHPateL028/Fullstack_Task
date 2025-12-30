import { Router } from "express";
import chatRouter from "./chat.js";
import sessionRouter from "./session.js";

const indexRouter = Router();

indexRouter.use("/chat", chatRouter);
indexRouter.use("/sessions", sessionRouter);

export default indexRouter;
