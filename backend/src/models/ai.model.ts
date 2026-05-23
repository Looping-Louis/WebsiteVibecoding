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

export interface AiVectorStoreCreateRequest {
  name?: string;
}

export interface AiVectorStoreResponse {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

export interface AiFileUploadResponse {
  success: true;
  vectorStoreId: string;
  fileId: string;
  filename: string;
  status: string;
}
