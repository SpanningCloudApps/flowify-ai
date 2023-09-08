import { getLogger } from '../../logger/logger';

const logger = getLogger();

export class DataStorageService {
  private static _instance = new DataStorageService();

  static get instance(): DataStorageService {
    return this._instance;
  }

  public async save(data: Record<string, unknown>) {

  }
}

export const dataStorageService = DataStorageService.instance;
