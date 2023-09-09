import config from 'config';
import OpenAI from 'openai';

export interface AIResponse {
  index: number;
  message: {
    role: string;
    content: string;
  }
}

export class OpenAIConnector {
  private static _instance = new OpenAIConnector();

  static get instance(): OpenAIConnector {
    return this._instance;
  }

  private openAIClient: OpenAI;

  private readonly maxTokens: number;
  private readonly model: string;
  private readonly responseDistribution: number;
  private readonly temperature: number;

  constructor() {
    this.maxTokens = config.get<number>('ai.openai.maxTokens');
    this.model = config.get<string>('ai.openai.model');
    this.temperature = config.get<number>('ai.openai.temperature');
    this.responseDistribution = config.get<number>('ai.recognition.responseDistribution');

    const apiKey = config.get<string>('ai.openai.apiKey');
    this.openAIClient = new OpenAI({ apiKey });
  }

  public async executeWithContext(requestContent: string): Promise<AIResponse[]> {
    try {
      const context = await this.prepareContext();

      const completion = await this.openAIClient.chat.completions.create({
        messages: [
          { role: 'assistant', content: context },
          { role: 'assistant', content: requestContent }
        ],
        model: this.model,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        n: this.responseDistribution
      });

      return completion.choices as AIResponse[];
    } catch (err) {
      console.error(`Failed to analyze request with prompt: ${requestContent}`, err);
      throw err;
    }
  }

  public async reinforcementLearn(reinforcement: string): Promise<void> {
    try {
      await this.openAIClient.chat.completions.create({
        messages: [{ role: 'user', content: reinforcement }],
        model: this.model
      });
    } catch (err) {
      console.error(`Failed to reinforce model: ${reinforcement}`, err);
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
      Please in your response specify the title of chosen workflow if format like "Title: WORKFLOW_TITLE" if possible.
      If it's not possible to decide from the given variants, please respond like "Unable to recognize".`;
    } catch (err) {
      console.error(`Failed to prepare analyzing context.`, err);
      throw err;
    }
  }
}

export const openAIConnector = OpenAIConnector.instance;
