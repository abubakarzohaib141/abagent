// src/types/chat.ts
export type Role = "system" | "user" | "assistant";

export interface Message {
  role: Role;
  content: string;
}
