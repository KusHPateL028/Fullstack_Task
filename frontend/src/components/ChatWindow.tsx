import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSessionsById } from "../services/SessionApi";
import { createAndStoerChat, storeChat } from "../services/chatApi";
import MessageTable from "./MessageTable";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useTheme } from "../contexts/ThemeContext";
import type { Message, ApiError, TableData } from "../types";

function ChatWindow() {
  const { id: sessionId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const send = async () => {
    try {
      let res;
      if (sessionId) {
        res = await storeChat(sessionId, input);
      } else {
        res = await createAndStoerChat(input);
      }

      setMessages((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: res.data.data.message },
      ]);
      setInput("");
      if (!sessionId) {
        const newId = res.data.data.id;
        window.history.replaceState(null, "", `/chat/${newId}`);
      }
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      toast.error(error?.response?.data?.message || "Failed to send message");
      console.error("error", err);
    }
  };

  useEffect(() => {
    if (sessionId) {
      getSessionsById(sessionId)
        .then((res) => setMessages(res.data.data))
        .catch((err) => {
          toast.error(
            err?.response?.data?.message || "Failed to load chat session"
          );
          console.error("error", err);
          setMessages([]);
          if (err?.response?.data?.message == "Session not found")
            navigate("/");
        });
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col h-full">
      <div
        className={`flex-1 p-6 overflow-y-auto ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}>
        {messages?.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="mb-6">
              <MessageTable
                data={m.content as TableData}
                msgId={m?.msgId as string}
                sessionId={sessionId}
                reaction={m.reaction}
              />
            </div>
          ) : (
            <div
              key={i}
              className={`mb-4 p-4 rounded-lg shadow-sm max-w-xs sm:max-w-md ml-auto ${
                theme === "dark"
                  ? "bg-blue-900 text-blue-100"
                  : "bg-blue-100 text-blue-900"
              }`}>
              <p className="text-sm sm:text-base">{m.content as string}</p>
            </div>
          )
        )}
      </div>
      <div
        className={`p-4 border-t ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className={`flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-transparent"
                : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-transparent"
            }`}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            onClick={send}
            className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-colors disabled:opacity-50 whitespace-nowrap ${
              theme === "dark"
                ? "bg-blue-700 hover:bg-blue-800 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={!input.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
