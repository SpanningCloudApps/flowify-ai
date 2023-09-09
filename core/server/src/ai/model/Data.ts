/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

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
