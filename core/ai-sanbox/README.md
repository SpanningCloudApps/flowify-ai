# AI Connector

## ML Models

AI Connector module currently supports two different strategies for AI ticket recognition:
`gpt-3.5-turbo` from [OpenAI API](https://platform.openai.com/docs/models/gpt-3-5)
and original `Terratrice` model (LSTM-based).

### Terratrice LSTM-based Model

#### Description

Written with TensorFlow framework, Terratrice is a light-weight model with two consequent LSTM layers (Long-Short Term Memory).
This models assembled and stores locally which allows to refit each instance of model independently
(e.g. Slack-Bot, Teams-Bot implementations) during the whole working process of Flowify.

#### Usage

Please specify `NODE_PATH` env variable as following:

```bash
export NODE_PATH=${AI_HOME}/core/ai-sandbox
```

If you're using original Terratrice model instead of OpenAI connector, please pass to `AIContext`
strategy a `TensorflowFacade` as argument.

Before executing request, model should be assembled and trained with npm script (from `ai-sandbox` folder):
``npm run assemble``
In case you already have serialized variant of pretrained model, go through next steps:
1. Create the model directory (from `ai-sandbox` folder):
```
mkdir ./src/tensorflow/model/terratrice
```
2. Put your model JSON and binary weights into directory.

After that model should be successfully deserialized.
