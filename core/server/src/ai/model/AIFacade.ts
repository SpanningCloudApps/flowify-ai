import { AIResponse, TensorFlowResponse } from './AIConnector';

export interface Data {
  createdBy: string;
  title: string;
  description: string;
  additionalInfo?: string[];
}

export interface ClassificationData {
  workflowName: string | null;
  probability: number;
}

export interface CategorizationResult {
  workflowName: string | null;
  probability: number;
  allClassifications: ClassificationData[];
}

export interface AIFacade {
  categorize: (data: Data) => Promise<CategorizationResult>;
  parseResponses: (responses: (TensorFlowResponse | AIResponse)[]) => CategorizationResult;
}
