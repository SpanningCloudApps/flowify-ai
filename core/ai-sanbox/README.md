# AI Connector

## ML Models

AI Connector module currently supports two different strategies for AI ticket recognition:
`gpt-3.5-turbo` from [OpenAI API](https://platform.openai.com/docs/models/gpt-3-5)
and `MobileBERT Q&A` from [TensorFlow Hub](https://tfhub.dev/tensorflow/tfjs-model/mobilebert/1).

### MobileBERT NLP Model

Written with TensorFlow framework, MobileBERT is a light-weight version of BERT NLP model
(native language processing). It's a pre-trained model optimized to work with TensorFlow.js
package, which allows us to achieve full expierience of already trainde light-weight NLP model
with ability to run process of reinforcement learning during the whole working process of Flowify.

The model can be used to build a system that can answer users’ questions in natural language.
It was created using a pre-trained BERT model fine-tuned on SQuAD 1.1 dataset.

BERT, or Bidirectional Encoder Representations from Transformers, is a method of pre-training language representations which obtains state-of-the-art results on a wide array of Natural Language Processing tasks.

Flowify uses a compressed version of BERT, MobileBERT, that runs 4x faster and has 4x smaller model size.
