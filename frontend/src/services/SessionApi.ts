import { api } from "./ApiServices";
import type { SessionsResponse, MessagesResponse } from "../types";
import type { AxiosResponse } from "axios";

export const getSessions = (): Promise<AxiosResponse<SessionsResponse>> => {
    return api.get('sessions/');
};

export const getSessionsById = (id: string): Promise<AxiosResponse<MessagesResponse>> => {
    return api.get(`sessions/${id}`);
};