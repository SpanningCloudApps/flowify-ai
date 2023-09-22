/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { TicketDto } from 'dto/Ticket';
import { AIResponse } from 'model/AIConnector';

export interface CategorizationResult {
  probability: number;
  workflowName: string | null;
  allClassifications: {
    probability: number;
    workflowName: string | null;
  }[];
}

export interface AIFacade {
  categorize: (ticket: TicketDto) => Promise<CategorizationResult>;
  parseResponses: (responses: (number | AIResponse)[]) => CategorizationResult;
}
