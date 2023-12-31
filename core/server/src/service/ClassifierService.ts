import { getLogger } from '../logger/logger';
import { aiContext, AIMode } from '../ai/context/AIContext';
import { DataProcessBodyDto } from '../dto/DataDto';
import config from 'config';

const logger = getLogger();

export interface ClassificationData {
  workflowName: string;
  highProbability: number;
  allClassifications: ClassificationResult[];
}

export enum Workflow {
  UNKNOWN = 'UNKNOWN'
}

export interface ClassificationResult {
  workflowName: string;
  probability: number;
}

export class ClassifierService {
  private static _instance = new ClassifierService();

  static get instance(): ClassifierService {
    return this._instance;
  }

  public async classify(data: DataProcessBodyDto): Promise<ClassificationData> {
    const classificationData = {
      createdBy: data.createdBy,
      title: data.title,
      description: data.description,
      additionalInfo: data.additionalInfo
    };

    logger.info(`Data to classify: ${JSON.stringify(classificationData)}`);

    const result =
      await (aiContext.withAIStrategy(config.has('ai.mode') ? config.get('ai.mode') : AIMode.OPENAI))
        .categorize(classificationData);

    return {
      workflowName: result.workflowName || Workflow.UNKNOWN,
      highProbability: result.probability || 0,
      allClassifications: result.allClassifications.map(c => ({
        workflowName: c.workflowName || Workflow.UNKNOWN,
        probability: c.probability || 0
      }))
    };
  }
}

export const classifierService = ClassifierService.instance;
