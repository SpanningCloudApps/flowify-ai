export interface ClassificationResultData {
  workflowName: string;
}

export class ClassificationProcessorService {
  private static _instance = new ClassificationProcessorService();

  static get instance(): ClassificationProcessorService {
    return this._instance;
  }

  public async store(data: Record<string, unknown>) {

  }
}

export const classificationProcessorService = ClassificationProcessorService.instance;
