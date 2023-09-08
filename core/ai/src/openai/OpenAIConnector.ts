/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import config from 'config';
import OpenAI from 'openai';

export class OpenAIConnector {
  private static _instance = new OpenAIConnector();

  static get instance(): OpenAIConnector {
    return this._instance;
  }

  private openAIClient: OpenAI;

  private readonly maxTokens: number;
  private readonly model: string;
  private readonly temperature: number;

  constructor() {
    this.maxTokens = config.get<number>('ai.openai.maxTokens');
    this.model = config.get<string>('ai.openai.model');
    this.temperature = config.get<number>('ai.openai.temperature');

    const apiKey = config.get<string>('ai.openai.apiKey');
    this.openAIClient = new OpenAI({ apiKey });
  }

  public async execute(requestContent: string, maxTokens?: number, temperature?: number) {
    try {
      const context = await this.prepareContext();

      const completion = await this.openAIClient.chat.completions.create({
        messages: [
          { role: 'assistant', content: context },
          { role: 'assistant', content: requestContent }
        ],
        model: this.model,
        max_tokens: maxTokens ?? this.maxTokens,
        temperature: temperature ?? this.temperature
      });

      return {
        resultMessage: completion.choices.map(choice => choice.message),
        metrics: completion.usage
      };
    } catch (err) {
      console.error(`Failed to analyze request with prompt: ${requestContent}`, err);
      throw err;
    }
  }

  private async prepareContext(): Promise<string> {
    try {
      const ticketsList = config.get('ai.tickets');
      const messages = ticketsList
        .map((ticket, index) => `${index++}) Request titled as ${ticket.title}: ${ticket.description}.`)
        .join('\n');

      return `Please imagine you're trying to help user according to the following flow:
      You need to decide what type of workflow is the most suitable for the user's request. Defaults workflow are the following:
      ${messages}
      In case user's request cannot be applied to any of the given workflows, please let me know.`;
    } catch (err) {
      console.error(`Failed to prepare analyzing context.`, err);
      throw err;
    }
  }
}

export const openAIConnector = OpenAIConnector.instance;
