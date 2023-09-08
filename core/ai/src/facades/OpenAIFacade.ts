/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { TicketDto } from 'dto/Ticket';
import { openAIConnector } from 'openai/OpenAIConnector';

class OpenAIFacade {
  private static _instance: OpenAIFacade;

  static get instance(): OpenAIFacade {
    return this._instance = new OpenAIFacade();
  }

  public async categorize(ticket: TicketDto) {
    let ticketPrompt = `Request's title: ${ticket.title}, the request is following: ${ticket.description}.`;
    if (ticket.additionalInfo) {
      ticketPrompt = `${ticketPrompt}. Additional helpful information: ${ticket.additionalInfo.join(', ')}.`
    }

    return await openAIConnector.execute(ticketPrompt);
  }
}

export const openAIFacade = OpenAIFacade.instance;
