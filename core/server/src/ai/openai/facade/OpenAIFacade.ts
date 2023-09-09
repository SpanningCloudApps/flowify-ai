/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import config from 'config';
import { CategorizationResult, Data } from '../../model/Data';
import { AIResponse, openAIConnector } from '../OpenAIConnector';
import { Connector } from '../../Connector';

class OpenAIFacade implements Connector {
  private static _instance: OpenAIFacade;

  static get instance(): OpenAIFacade {
    return this._instance = new OpenAIFacade();
  }

  public async categorize(data: Data): Promise<CategorizationResult> {
    let dataPrompt = `Request's title: ${data.title}, the request is following: ${data.description}.`;
    if (data.additionalInfo) {
      dataPrompt = `${dataPrompt}. Additional helpful information: ${data.additionalInfo.join(', ')}.`;
    }

    const responses = await openAIConnector.executeWithContext(dataPrompt);
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
    const tokenMatchingThreshold = config.get<number>('ai.recognition.tokenMatchingThreshold');

    let probableTokens;

    const recognizedOption = responses.find(response => response.message.content.toLowerCase().indexOf('title: ') < 3);
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
    const estimatedValue = proceededVariants.reduce((sum, response) => sum + (1 / (response.index + 1)), 0);
    const probability = recognizedOption ? (1 / (recognizedOption.index + 1)) / estimatedValue : 1 / estimatedValue;

    if (recognizedOption) {
      return {
        probability: probability * 100,
        workflowName: recognizedOption.message.content.split('Title: ')[1]
      };
    } else if (probability === 1 && proceededVariants[0].message.content.includes('Unable to recognize')) {
      return {
        probability: 100,
        workflowName: null
      };
    } else {
      return {
        probability: probability * 100,
        workflowName: responses[0].message.content.split('Title: ')[1]
      };
    }
  }
}

export const openAIFacade = OpenAIFacade.instance;
