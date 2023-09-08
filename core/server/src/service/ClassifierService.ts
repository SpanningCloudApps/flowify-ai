import { getLogger } from '../logger/logger';

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

  public async classify(data: Record<string, unknown>): Promise<ClassificationData> {
    // TODO: Integrate with NIKITA!
    logger.info(`Data to process: ${JSON.stringify(data)}`);
    // return {
    //   workflowName: 'TEST',
    //   highProbability: 89.8,
    //   allClassifications: [{ workflowName: 'TEST', probability: '89.8' }, { workflowName: 'TEST2', probability: '69.3' }]
    // };
    return {
      workflowName: Workflow.UNKNOWN,
      highProbability: 0,
      allClassifications: [{ workflowName: 'TEST', probability: '89.8' }, {
        workflowName: 'TEST2',
        probability: '69.3'
      }]
    };
  }
}

export const classifierService = ClassifierService.instance;
