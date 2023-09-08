import { getLogger } from '../logger/logger';

const logger = getLogger();

export class ClassifierService {
  private static _instance = new ClassifierService();

  private ClassifierService() {

  }

  static get instance(): ClassifierService {
    return this._instance;
  }

  public async classify(data: Record<string, unknown>) {
    logger.info(`Data to process: ${JSON.stringify(data)}`);
  }
}

export const classifierService = ClassifierService.instance;
