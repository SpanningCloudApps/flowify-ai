/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import * as tf from '@tensorflow/tfjs-node';

export class PositionEmbedding extends tf.layers.Layer {
  static className = 'PositionEmbedding';

  constructor(config) {
    super(config);
  }
}
