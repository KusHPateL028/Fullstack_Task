import fs from "fs";

export const readJSON = async (file) => await JSON.parse(fs.readFileSync(file, "utf-8"));

export const createSession = async (sessionsPath, input) => {
  const sessions = await readJSON(sessionsPath);
  const newSession = {
    id: Date.now().toString(),
    title: input || "New Chat",
  };

  sessions.unshift(newSession);
  await writeJSON(sessionsPath, sessions);

  return newSession;
};

export const writeJSON = async (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
