/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import '@tensorflow/tfjs';

import { TerratriceModel } from 'tensorflow/model/TerratriceModel';
export class TensorFlowConnector {
  private static _instance: TensorFlowConnector = new TensorFlowConnector();

  static get instance(): TensorFlowConnector {
    return this._instance;
  }

  private modelInstance: TerratriceModel;

  constructor() {
    this.modelInstance = new TerratriceModel();
  }

  public async executeWithContext(prompt: string): Promise<number[]> {
    try {
      await this.modelInstance.deserializeModel();

      const answersList: number[][] = await this.modelInstance.execute(prompt);

      return answersList.flat();
    } catch (err) {
      console.error(`Failed to analyze request with prompt: ${prompt}`, err);
      throw err;
    }
  }
}

export const tensorFlowConnector = TensorFlowConnector.instance;
