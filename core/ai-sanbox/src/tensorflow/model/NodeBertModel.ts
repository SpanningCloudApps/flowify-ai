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
  'ADD_USER': [0, 0, 0, 0],
  'REMOVE_USER': [0, 0, 0, 1],
  'RESET_PASSWORD': [0, 0, 1, 0],
  'SLOW_INTERNET': [0, 0, 1, 1],
  'APP_DOWNTIME': [0, 1, 0, 0],
  'LOW_DISK_SPACE': [0, 1, 0, 1],
  'ASSIGN_M365': [0, 1, 1, 0],
  'GRANT_ACCESS': [0, 1, 1, 1]
};

export class NodeBertModel {
  private modelInstance: tf.LayersModel;
  private modelURI: string;

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
    model.add(tf.layers.lstm({ units: 64 }));
    model.add(tf.layers.dense({ units: 4, activation: 'softmax' }));

    model.compile({ optimizer: tf.train.adam(0.001), loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

    this.modelInstance = model;
  }

  public async trainModel() {
    const { preset, train } = await this.prepareTestData();

    await this.modelInstance.fit(preset, train, {
      epochs: 20,
      batchSize: 32,
      shuffle: true,
      callbacks: { onBatchEnd: (batch, logs) => console.log('ACCURACY: ', logs.acc) }
    });
  }

  public async deserializeModel() {
    this.modelInstance = await tf.loadLayersModel(this.modelURI);
  }

  public async serializeModel() {
    await this.modelInstance.save(this.modelURI);
  }

  public displayModelSummary() {
    this.modelInstance.summary();
  }

  private async prepareTestData(): Promise<{ preset: tf.Tensor2D, train: tf.Tensor2D }> {
    const tokenizer = await loadTokenizer();

    const workflows = config.get('ai.tickets').slice(0, 500);

    const preset: number[] = await Promise.all(workflows.map(workflow => tokenizer.tokenize(workflow.description)));
    const train = tf.tensor2d(
      workflows.map(workflow => workflowEncodeMap[workflow.title])
    );

    return { preset: tf.tensor2d(preset, [workflows.length, 128], 'int32'), train }
  }

}
