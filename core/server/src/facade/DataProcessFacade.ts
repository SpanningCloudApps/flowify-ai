import { DataPrepareBodyDto, DataProcessBodyDto, DataStorageDto } from '../dto/DataDto';
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

  public async initiate(body: DataProcessBodyDto): Promise<DataStorageDto> {
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
    return {
      workflowName: classificationData.workflowName
    };
  }

  public async start(body: DataPrepareBodyDto) {
    logger.info(`Data to prepare start workflow: ${JSON.stringify(body)}`);
    const classificationResult = {
      workflowName: body.workflowName,
      actor: body.actor
    };
    logger.info(`Data to initiate workflow: ${JSON.stringify(classificationResult)}`);
    await classificationProcessorService.publishClassificationResult(classificationResult);
  }

  public async process(data: Record<string, unknown>) {
    await classificationProcessorService.publishClientInteraction(data);
  }
}

export const dataProcessFacade = DataProcessFacade.instance;
