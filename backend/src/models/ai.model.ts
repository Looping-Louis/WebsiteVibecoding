export interface AiGenerateRequest {
  prompt: string;
}

export interface AiMessage {
  role: 'assistant';
  content: string;
  createdAt: string;
}
