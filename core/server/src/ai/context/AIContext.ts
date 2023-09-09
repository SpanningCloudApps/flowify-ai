import { AIFacade, CategorizationResult, Data } from '../model/AIFacade';
import { tensorFlowFacade } from '../tensorflow/facade/TensorFlowFacade';
import { openAIFacade } from '../openai/facade/OpenAIFacade';

export enum AIMode {
  TENSORFLOW = 'tensorflow',
  OPENAI = 'openai'
}

class AIContext {
  private static _instance = new AIContext();

  static get instance() {
    return this._instance;
  }

  private aiStrategy: AIFacade;

  public withAIStrategy(strategy: string) {
    this.aiStrategy = strategy === AIMode.TENSORFLOW
      ? tensorFlowFacade
      : openAIFacade;
    return this;
  }

  public async categorize(data: Data): Promise<CategorizationResult> {
    return await this.aiStrategy.categorize(data);
  }
}

export const aiContext = AIContext.instance;
