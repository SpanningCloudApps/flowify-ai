import { DataProcessBodyDto } from '../dto/DataDto';
import { getLogger } from '../logger/logger';
import { classifierService } from '../service/ClassifierService';
import { dataStorageService } from '../service/DataStorageService';
import { classificationProcessorService } from '../service/workflow/ClassificationProcessorService';

const logger = getLogger();

export class DataProcessFacade {
  private static _instance = new DataProcessFacade();

  static get instance(): DataProcessFacade {
    return this._instance;
  }

  public async initiate(body: DataProcessBodyDto) {
    logger.info(`Data to process: ${JSON.stringify(body)}`);
    const classificationData = await classifierService.classify(body);
    const dataStorageData = {
      input: body,
      workflowName: classificationData.workflowName,
      probability: classificationData.highProbability,
      data: {
        allClassifications: classificationData.allClassifications
      }
    };
    logger.info(`Data to store: ${JSON.stringify(dataStorageData)}`);
    await dataStorageService.store(dataStorageData);
    const classificationResult = {
      workflowName: classificationData.workflowName,
      actor: body.createdBy
    };
    logger.info(`Data to initiate workflow: ${JSON.stringify(classificationResult)}`);
    await classificationProcessorService.publishClassificationResult(classificationResult);
  }

  public async process(data: Record<string, unknown>) {
    await classificationProcessorService.publishClientInteraction(data);
  }
}

export const dataProcessFacade = DataProcessFacade.instance;
