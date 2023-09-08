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

  public async execute(requestContent: string) {
    try {
      const completion = await this.openAIClient.chat.completions.create({
        messages: [{ role: 'user', content: requestContent }],
        model: this.model,
        max_tokens: this.maxTokens,
        temperature: this.temperature
      });

      console.log('FULL: ', completion);

      return completion.choices;
    } catch (err) {
      console.error(`Failed to analyze request with prompt: ${requestContent}`, err);
      throw err;
    }
  }
}

export const openAIConnector = OpenAIConnector.instance;
