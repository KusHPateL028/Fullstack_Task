import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createSession, readJSON, writeJSON } from "../utils/exportFunction.js";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sessionsPath = path.join(__dirname, "../../public/data/sessions.json");
const chatsPath = path.join(__dirname, "../../public/data/chats.json");

const startChat = asyncHandler(async (_, res) => {
  const newSession = await createSession(sessionsPath);

  return res
    .status(200)
    .json(new ApiResponse(200, newSession, "Chat started successfully"));
});

const storeChatMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const chats = await readJSON(chatsPath);

  let sessionId = req.params.id;

  if (!sessionId || sessionId === "undefined") {
    const newSession = await createSession(sessionsPath, message);
    sessionId = newSession.id;
    chats[sessionId] = [];
  }

  if (!chats[sessionId]) {
    chats[sessionId] = [];
  }

  const msgId = uuidv4();

  const response = {
    description: "User performance data",
    table: {
      headers: ["Name", "Score", "Status"],
      rows: [
        ["Kush", 85, "Pass"],
        ["Amit", 45, "Fail"],
      ],
    },
  };

  chats[sessionId].push(
    {
      msgId,
      role: "user",
      content: message,
      createdAt: new Date().toISOString(),
    },
    {
      msgId,
      role: "assistant",
      content: response,
      createdAt: new Date().toISOString(),
    }
  );

  await writeJSON(chatsPath, chats);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: sessionId,
        msgId,
        message: response,
      },
      "Chat message stored successfully"
    )
  );
});

const reactToMsg = asyncHandler(async (req, res) => {
  const { sessionId, messageId } = req.params;
  const { reaction } = req.body;
  
  if (!["like", "dislike", null].includes(reaction)) {
    return new ApiError(400, "Invalid reaction type");
  }
  
  const chats = await readJSON(chatsPath);
  
  if (!chats[sessionId]) {
    return new ApiError(404, "Session not found");
  }
  
  const message = chats[sessionId].find((m) => m.msgId === messageId && m.role === "assistant");
  
  if (!message) {
    return new ApiError(404, "Message not found");
  }

  message.reaction = reaction;

  await writeJSON(chatsPath, chats);

  return res.status(200).json(new ApiResponse(200, null, "Reaction updated successfully"));
});

export { startChat, storeChatMessage, reactToMsg };
