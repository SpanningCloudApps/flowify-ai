export interface AIResponse {
  index: number;
  message: {
    role: string;
    content: string;
  }
}

export interface TensorFlowResponse {
  text: string;
  score: number;
  startIndex: number;
  endIndex: number;
}

export interface AIConnector {
  executeWithContext: (request: string | string[]) => Promise<(AIResponse | TensorFlowResponse)[]>;
  prepareContext: () => string;
}
