/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import config from 'config';
import { TicketDto } from 'dto/Ticket';
import { AIResponse, openAIConnector } from 'openai/OpenAIConnector';

export interface CategorizationResult {
  probability: number;
  content: string;
}

class OpenAIFacade {
  private static _instance: OpenAIFacade;

  static get instance(): OpenAIFacade {
    return this._instance = new OpenAIFacade();
  }

  public async categorize(ticket: TicketDto): Promise<CategorizationResult> {
    let ticketPrompt = `Request's title: ${ticket.title}, the request is following: ${ticket.description}.`;
    if (ticket.additionalInfo) {
      ticketPrompt = `${ticketPrompt}. Additional helpful information: ${ticket.additionalInfo.join(', ')}.`
    }

    const responses = await openAIConnector.execute(ticketPrompt);
    return this.parseResponses(responses);
  }

  private parseResponses(responses: AIResponse[]): CategorizationResult {
    const definedCaseThreshold = config.get<number>('ai.recognition.definedCaseThreshold');
    const tokenMatchingThreshold = config.get<number>('ai.recognition.tokenMatchingThreshold');

    let definedValue = '';
    const messages = responses.map((response) => response.message.content);
    const definedCase = messages
      .filter((message, index) => {
        if (messages.indexOf(message) !== index) {
          definedValue = message;
          return false;
        }
        return true;
      }).length / responses.length < definedCaseThreshold;

    if (definedCase) {
      return {
        probability: 1,
        content: definedValue
      }
    }

    const probableTokens = responses[0].message.content.split(' ');
    const processedResponses = responses.filter(response => {
      const value = response.message.content.split(' ')
        .filter(token => probableTokens.includes(token)).length / probableTokens.length;
      return value < tokenMatchingThreshold;
    });

    const estimatedValue = [...processedResponses, responses[0]].reduce((sum, response) => sum + (1 / (response.index+1)), 0);

    return {
      probability: 1 / estimatedValue,
      content: responses[0].message.content
    }
  }
}

export const openAIFacade = OpenAIFacade.instance;
