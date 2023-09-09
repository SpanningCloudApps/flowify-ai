import { TicketDto } from './Ticket';

export interface OpenAIRequestBody {
  ticket: TicketDto;
}

export interface ReinforcementRequestBody {
  prompt: string;
}
