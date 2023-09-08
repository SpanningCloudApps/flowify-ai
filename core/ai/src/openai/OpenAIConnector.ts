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

  constructor() {
    const apiKey = config.get<string>('ai.openai.apiKey');
    this.openAIClient = new OpenAI({ apiKey });
  }

  public async execute() {
    const completion = await this.openAIClient.chat.completions.create({
      messages: [{ role: 'user', content: 'Pooper test run' }],
      model: 'gpt-3.5-turbo',
    });

    console.log('FULL: ', completion);

    return completion.choices;
  }
}

export const openAIConnector = OpenAIConnector.instance;
