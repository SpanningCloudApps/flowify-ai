/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import * as tf from '@tensorflow/tfjs-node';

export class FeedForward extends tf.layers.Layer {
  static className = 'FeedForward';

  constructor(config) {
    super(config);
  }
}
