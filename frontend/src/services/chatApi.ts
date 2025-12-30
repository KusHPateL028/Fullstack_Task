import { api } from "./ApiServices";
import type { StartChatResponse, SendMessageResponse } from "../types";
import type { AxiosResponse } from "axios";

export const startChat = (): Promise<AxiosResponse<StartChatResponse>> => {
  return api.post("chat/start");
};

export const storeChat = (id: string, msg: string): Promise<AxiosResponse<SendMessageResponse>> => {
  return api.post(`chat/${id}`, { message: msg });
};

export const createAndStoerChat = (msg: string): Promise<AxiosResponse<SendMessageResponse>> => {
  return api.post(`chat/`, { message: msg });
};

export const reactToMsg = (
  sessionId: number,
  msgId: string,
  reaction: "like" | "dislike" | null
): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
  return api.put(`chat/${sessionId}/message/${msgId}/react`, { reaction });
};
