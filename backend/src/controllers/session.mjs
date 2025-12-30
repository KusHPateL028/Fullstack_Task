import { fileURLToPath } from "url";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { readJSON } from "../utils/exportFunction.js";
import path from "path";
import ApiError from "../utils/ApiError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sessionsPath = path.join(__dirname, "../../public/data/sessions.json");
const chatsPath = path.join(__dirname, "../../public/data/chats.json");

const getSessions = asyncHandler(async (req, res) => {
  const data = await readJSON(sessionsPath);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Sessions fetched successfully"));
});

const getSessionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const sessions = await readJSON(sessionsPath);
  const chats = await readJSON(chatsPath);

  const sessionExists = sessions.find((session) => session.id === id);

  if (!sessionExists) {
    throw new ApiError(404, "Session not found");
  }

  const data = await chats[id] || [];

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Chats fetched successfully"));
});

export { getSessions, getSessionById };
