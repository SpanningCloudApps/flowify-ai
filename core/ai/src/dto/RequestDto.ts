/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { TicketDto } from './Ticket';

export interface OpenAIRequestBody {
  ticket: TicketDto;
}

export interface ReinforcementRequestBody {
  prompt: string;
}
