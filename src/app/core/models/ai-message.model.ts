export interface AiMessage {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface AiGenerateRequest {
  prompt: string;
}

export interface AiChatRequest {
  message: string;
}

export interface AiChatResponse {
  reply: string;
}
