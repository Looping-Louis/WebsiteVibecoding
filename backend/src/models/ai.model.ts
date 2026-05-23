export interface AiGenerateRequest {
  prompt: string;
}

export interface AiMessage {
  role: 'assistant';
  content: string;
  createdAt: string;
}

export interface AiChatRequest {
  message: string;
}

export interface AiChatResponse {
  reply: string;
}
