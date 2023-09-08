import { DataProcessBodyDto } from '../dto/DataDto';
import { getLogger } from '../logger/logger';
import { classifierService } from '../service/ClassifierService';
import { dataStorageService } from '../repository/data/DataStorageRepostory';

const logger = getLogger();

export class DataProcessFacade {
  private static _instance = new DataProcessFacade();

  static get instance(): DataProcessFacade {
    return this._instance;
  }

  public async process(body: DataProcessBodyDto) {
    await classifierService.classify(body);
    await dataStorageService.save(body);

    logger.info(`Data to process: ${JSON.stringify(body)}`);
  }

}

export const dataProcessFacade = DataProcessFacade.instance;
