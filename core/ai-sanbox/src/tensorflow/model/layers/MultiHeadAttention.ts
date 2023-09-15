/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import * as tf from '@tensorflow/tfjs-node';

export class MultiHeadAttention extends tf.layers.Layer {
  static className = 'MultiHeadAttention';

  constructor(config) {
    super(config);
  }
}
