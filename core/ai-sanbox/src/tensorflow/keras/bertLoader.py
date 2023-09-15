#  Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.

import sys
import codecs
import numpy as np
import keras
import tensorflow as tf
import tensorflowjs as tfjs
from keras_bert import load_trained_model_from_checkpoint
#import tokenization

folder = 'cased_L-12_H-768_A-12'

config_path = folder+'/bert_config.json'
checkpoint_path = folder+'/bert_model.ckpt'
vocab_path = folder+'/vocab.txt'
tfjs_target_dir = 'mobilebert_1'

tfjs.converters.save_keras_model(model, tfjs_target_dir)
