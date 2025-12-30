export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Session {
  id: string;
  title: string;
}

export interface SessionsResponse extends ApiResponse<Session[]> {}

export interface TableData {
  description: string;
  table: {
    headers: string[];
    rows: any[][];
  };
}

export interface Message {
  msgId?: string;
  role: "user" | "assistant";
  content: string | TableData;
  reaction?: "like" | "dislike" | null;
}

export interface MessagesResponse extends ApiResponse<Message[]> {}

export interface StartChatResponse extends ApiResponse<{ id: string }> {}

export interface SendMessageResponse extends ApiResponse<{
  message: string | TableData;
  id?: string;
}> {}

export type Theme = "light" | "dark";

export interface MessageTableProps {
  data: TableData;
  msgId: string;
  sessionId: string | undefined;
  reaction: "like" | "dislike" | null | undefined;
}

export interface SidebarProps {}

export interface ChatWindowProps {}

export interface ChatbotProps {}

export interface ApiError {
  message: string;
  status?: number;
}