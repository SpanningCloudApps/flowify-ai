/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

export interface Data {
  createdBy: string;
  title: string;
  description: string;
  additionalInfo?: string[];
}

export interface CategorizationResult {
  probability: number;
  workflowName: string | null;
}
