import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../contexts/ThemeContext";
import { startChat } from "../services/chatApi";
import { getSessions } from "../services/SessionApi";
import type { Session } from "../types";

export default function Sidebar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const fetchSessions = async () => {
    await getSessions()
      .then((res) => setSessions(res.data.data))
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to load sessions");
        console.error("error", err);
        setSessions([]);
      });
  };

  const newChat = async () => {
    await startChat()
      .then((res) => {
        navigate(`/chat/${res.data.data.id}`);
        fetchSessions();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to start new chat");
        console.error("error", err);
      });
  };

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <>
      <div
        className={`h-screen p-4 transition-all duration-300 shadow-lg fixed md:relative z-50 md:z-auto
          ${
            collapsed
              ? "md:w-16 md:translate-x-0 w-12 -translate-x-10 md:-translate-x-0"
              : "w-64 translate-x-0"
          } 
          ${
            theme === "dark"
              ? "bg-gradient-to-b from-gray-800 to-gray-900"
              : "bg-gradient-to-b from-blue-600 to-blue-800"
          }`}>
        {collapsed && (
          <div
            className="md:hidden absolute right-0 top-1/2 left-[80%] transform -translate-y-1/2  w-8 h-16 bg-blue-600 dark:bg-gray-800 rounded-r-lg shadow-lg flex items-center justify-center cursor-pointer"
            onClick={() => setCollapsed(false)}>
            <span className="text-white text-lg">☰</span>
          </div>
        )}

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className={`mb-4 w-full text-left p-2 rounded-lg transition-colors ${
            theme === "dark"
              ? "text-white hover:bg-gray-700"
              : "text-white hover:bg-blue-700"
          } ${collapsed ? "md:block hidden" : ""}`}>
          {collapsed ? "☰" : "✖"}
        </button>

        <div
          className={`flex flex-col h-full ${
            collapsed ? "hidden md:block" : "block"
          }`}>
          <button
            onClick={newChat}
            className={`w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white p-3 mb-4 rounded-lg font-semibold shadow-md transition-colors`}>
            {collapsed ? "+" : "New Chat"}
          </button>

          <button
            onClick={toggleTheme}
            className={`w-full p-1 mb-4 rounded-lg font-semibold shadow-md transition-colors ${
              theme === "dark"
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-500 hover:bg-gray-600 text-white"
            }`}>
            {collapsed
              ? theme === "light"
                ? "🌙"
                : "☀️"
              : theme === "light"
              ? "Dark Mode"
              : "Light Mode"}
          </button>

          <div className="space-y-2 max-h-100 overflow-y-auto flex-1">
            {sessions.map((s) => (
              <Link
                key={s.id}
                to={`/chat/${s.id}`}
                className={`block p-3 rounded-lg transition-colors shadow-sm ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-blue-700 text-white"
                }`}>
                {s.title}
              </Link>
            ))}
          </div>

          <div
            className={`pt-4 border-t ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                  theme === "dark" ? "bg-gray-600" : "bg-blue-500"
                }`}>
                K
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                      Kush Patel
                    </p>
                    <p
                      className={`text-xs truncate ${
                        theme === "dark" ? "text-gray-400" : "text-white"
                      }`}>
                      kushpatel0028@gmail.com
                    </p>
                  </div>
                  <button
                    className={`p-1 rounded ${
                      theme === "dark"
                        ? "hover:bg-gray-600 text-gray-400"
                        : "hover:bg-gray-200 text-gray-600"
                    }`}>
                    ⋯
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
