import { Router } from "express";
import { getSessionById, getSessions } from "../controllers/session.mjs";

const router = Router();

router.route("/").get(getSessions);
router.route("/:id").get(getSessionById);

export default router;
