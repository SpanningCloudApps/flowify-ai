/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
// TODO: introduce new name to the model since it no longer BERT-based
import config from 'config';
import * as tf from '@tensorflow/tfjs-node';

import {
  TokenEmbedding,
  PositionEmbedding,
  MultiHeadAttention,
  FeedForward
} from './layers';
import { loadTokenizer } from 'tensorflow/tokenizer/BertTokenizer';

const workflowEncodeMap = {
  'ADD_USER': [0, 0, 0, 0, 0, 0, 0, 1],
  'REMOVE_USER': [0, 0, 0, 0, 0, 0, 1, 0],
  'RESET_PASSWORD': [0, 0, 0, 0, 0, 1, 0, 0],
  'SLOW_INTERNET': [0, 0, 0, 0, 1, 0, 0, 0],
  'APP_DOWNTIME': [0, 0, 0, 1, 0, 0, 0, 0],
  'LOW_DISK_SPACE': [0, 0, 1, 0, 0, 0, 0, 0],
  'ASSIGN_M365': [0, 1, 0, 0, 0, 0, 0, 0],
  'GRANT_ACCESS': [1, 0, 0, 0, 0, 0, 0, 0]
};

export class NodeBertModel {
  private modelInstance: tf.LayersModel;
  private modelURI: string = 'file://src/tensorflow/model/terratrees';

  constructor() {
    tf.serialization.registerClass(TokenEmbedding);
    tf.serialization.registerClass(PositionEmbedding);
    tf.serialization.registerClass(MultiHeadAttention);
    tf.serialization.registerClass(FeedForward);
  }

  public async assembleModel(): Promise<void> {
    const model = await tf.sequential();
    model.add(tf.layers.embedding({ batchSize: 1, inputDim: 2**15, outputDim: 128, inputLength: 128 }));
    model.add(tf.layers.lstm({ returnSequences: true, units: 128 }));
    model.add(tf.layers.spatialDropout1d({ rate: 0.4 }));
    model.add(tf.layers.lstm({ units: 64 }));
    model.add(tf.layers.spatialDropout1d({ rate: 0.4 }));
    model.add(tf.layers.dense({ units: 8, activation: 'softmax' }));

    model.compile({ optimizer: tf.train.adam(0.001), loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

    this.modelInstance = model;
  }

  public async trainModel() {
    const { preset, train } = await this.prepareTestData();

    await this.modelInstance.fit(preset, train, {
      epochs: 8,
      batchSize: 32,
      shuffle: true,
      callbacks: { onBatchEnd: (batch, logs) => console.log('ACCURACY: ', logs.acc) }
    });
  }

  public async deserializeModel() {
    this.modelInstance = await tf.loadLayersModel(`${this.modelURI}/model.json`);
  }

  public async serializeModel() {
    await this.modelInstance.save(this.modelURI);
  }

  public displayModelSummary() {
    this.modelInstance.summary();
  }

  public async execute(prompt: string): Promise<any> {
    const tokenizer = await loadTokenizer();

    const token = tokenizer.tokenize(prompt);
    const data = tf.tensor2d(token, [1, 128], 'int32');
    data.print();

    const result: tf.Tensor2D = await this.modelInstance.predict(data);
    result.print();

    return result.array();
  }

  private async prepareTestData(): Promise<{ preset: tf.Tensor2D, train: tf.Tensor2D }> {
    const tokenizer = await loadTokenizer();

    const workflows = config.get('ai.tickets').slice(0, 500);

    const preset: number[][] = await Promise.all(workflows.map(workflow => tokenizer.tokenize(workflow.description)));
    const train = tf.tensor2d(
      workflows.map(workflow => workflowEncodeMap[workflow.title])
    );

    return { preset: tf.tensor2d(preset, [workflows.length, 128], 'int32'), train }
  }

}
