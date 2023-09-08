import { dataStorageRepository } from '../repository/data/DataStorageRepository';

export class DataStorageService {
  private static _instance = new DataStorageService();

  static get instance(): DataStorageService {
    return this._instance;
  }

  public async store(data: Record<string, unknown>) {
    const model = {
      input: data.input,
      workflow_name: data.workflowName,
      probability: data.highProbability,
      data: data.data
    };

    await dataStorageRepository.save(model);
  }
}

export const dataStorageService = DataStorageService.instance;
