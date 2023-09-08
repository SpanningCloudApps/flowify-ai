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

    const responses = await openAIConnector.executeWithContext(ticketPrompt);
    return this.parseResponses(responses);
  }

  public async reinforcementLearn(prompt: string): Promise<void> {
    if (prompt) {
      await openAIConnector.reinforcementLearn(prompt);
    } else {
      await openAIConnector.reinforcementLearn('Please try once again');
    }
  }

  private parseResponses(responses: AIResponse[]): CategorizationResult {
    const definedCaseThreshold = config.get<number>('ai.recognition.definedCaseThreshold');
    const tokenMatchingThreshold = config.get<number>('ai.recognition.tokenMatchingThreshold');

    let definedValue = '';
    let probableTokens;
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

    const recognizedOption = responses.find(response =>
      response.message.content.includes('can be applied to')
      || response.message.content.includes('request aligns with the workflow')
      || response.message.content.includes('matches with the workflow')
      || response.message.content.includes('the most suitable workflow')
    );
    if (recognizedOption) {
      probableTokens = recognizedOption.message.content.split(' ');
    } else {
      probableTokens = responses[0].message.content.split(' ');
    }

    const processedResponses = responses.filter(response => {
      const value = response.message.content.split(' ')
        .filter(token => probableTokens.includes(token)).length / probableTokens.length;
      return value < tokenMatchingThreshold;
    });

    const proceededVariants = recognizedOption ? [...processedResponses, recognizedOption] : [...processedResponses, responses[0]];
    const estimatedValue = proceededVariants.reduce((sum, response) => sum + (1 / (response.index+1)), 0);
    const probability = 1 / estimatedValue;

    return {
      probability: probability * 100,
      content: responses[0].message.content
    }
  }
}

export const openAIFacade = OpenAIFacade.instance;
