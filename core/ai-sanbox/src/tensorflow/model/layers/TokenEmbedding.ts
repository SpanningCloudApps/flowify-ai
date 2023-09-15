/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import * as tf from '@tensorflow/tfjs-node';

export class TokenEmbedding extends tf.layers.Layer {
  static className = 'TokenEmbedding';

  constructor(config) {
    super(config);
  }
}
