import { useEffect, useState } from "react";
import { reactToMsg } from "../services/chatApi";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../contexts/ThemeContext";
import type { MessageTableProps, ApiError } from "../types";

export default function MessageTable({
  data,
  msgId,
  sessionId,
  reaction,
}: MessageTableProps) {
  const { theme } = useTheme();
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleReaction = async (newReaction: "like" | "dislike") => {
    try {
      let finalReaction: "like" | "dislike" | null = newReaction;

      if (
        (liked === true && newReaction === "like") ||
        (liked === false && newReaction === "dislike")
      ) {
        finalReaction = null;
      }

      await reactToMsg(Number(sessionId), msgId, finalReaction);

      setLiked(
        finalReaction === "like"
          ? true
          : finalReaction === "dislike"
          ? false
          : null
      );
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      toast.error(error?.response?.data?.message || "Failed to update reaction");
      console.error("Error updating reaction:", err);
    }
  };

  useEffect(() => {
    setLiked(
      reaction === "like" ? true : reaction === "dislike" ? false : null
    );
  }, [data]);

  return (
    <div className={`mb-6 p-6 rounded-xl shadow-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <p className={`font-bold text-lg mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{data.description}</p>

      <div className="overflow-x-auto">
        <table className={`w-full border-collapse border rounded-lg overflow-hidden ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
          <thead>
            <tr className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
              {data.table.headers.map((h: string) => (
                <th key={h} className={`border p-3 text-left font-semibold ${theme === 'dark' ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.table.rows.map((row: any[], i: number) => (
              <tr key={i} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                {row.map((c, j) => (
                  <td key={j} className={`border p-3 ${theme === 'dark' ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-600'}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={() => handleReaction("like")}
          className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
            liked === true 
              ? `bg-green-500 text-white border-green-500 shadow-md ${theme === 'dark' ? 'bg-green-600 border-green-600' : ''}` 
              : `${theme === 'dark' ? 'bg-gray-700 text-gray-400 border-gray-600 hover:border-green-500 hover:text-green-500' : 'bg-white text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-600'}`
          }`}
        >
          👍 Like
        </button>

        <button
          onClick={() => handleReaction("dislike")}
          className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
            liked === false 
              ? `bg-red-500 text-white border-red-500 shadow-md ${theme === 'dark' ? 'bg-red-600 border-red-600' : ''}` 
              : `${theme === 'dark' ? 'bg-gray-700 text-gray-400 border-gray-600 hover:border-red-500 hover:text-red-500' : 'bg-white text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600'}`
          }`}
        >
          👎 Dislike
        </button>
      </div>
    </div>
  );
}
