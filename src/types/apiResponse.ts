import { Message } from "@/model/User";

export interface ApiResponse<T = null> {
    success: boolean;
    message: string;
    data?: T;
  }

  export interface MessagePayload {
    content: string;
    createdAt: string; 
    isFromUser?: boolean;
    isAI?: boolean;
  }