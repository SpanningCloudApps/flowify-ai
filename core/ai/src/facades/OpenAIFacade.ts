import config from 'config';
import { TicketDto } from 'dto/Ticket';
import { AIResponse, openAIConnector } from 'openai/OpenAIConnector';

export interface CategorizationResult {
  probability: number;
  workflowName: string | null;
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
    const estimatedValue = proceededVariants.reduce((sum, response) => sum + (1 / (response.index+1)), 0);
    const probability = recognizedOption ? (1 / (recognizedOption.index+1)) / estimatedValue : 1 / estimatedValue;

    if (recognizedOption) {
      return {
        probability: probability * 100,
        workflowName: recognizedOption.message.content.split('Title: ')[1]
      }
    } else if (probability === 1 && proceededVariants[0].message.content.includes('Unable to recognize')) {
      return {
        probability: 100,
        workflowName: null
      }
    } else {
      return {
        probability: probability * 100,
        workflowName: responses[0].message.content.split('Title: ')[1]
      }
    }
  }
}

export const openAIFacade = OpenAIFacade.instance;
