import { Router } from "express";
import { reactToMsg, startChat, storeChatMessage } from "../controllers/chat.mjs";

const router = Router();

router.route('/start').post(startChat)
router.route('/:id').post(storeChatMessage)
router.route('/').post(storeChatMessage)
router.route('/:sessionId/message/:messageId/react').put(reactToMsg)

export default router;
