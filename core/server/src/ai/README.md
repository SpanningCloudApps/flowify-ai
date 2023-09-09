# AI Connector

## ML Models

AI Connector module currently supports two different strategies for AI ticket recognition:
`gpt-3.5-turbo` from [OpenAI API](https://platform.openai.com/docs/models/gpt-3-5)
and `MobileBERT Q&A` from [TensorFlow Hub](https://tfhub.dev/tensorflow/tfjs-model/mobilebert/1).

> Flowify uses a compressed version of BERT, MobileBERT, that runs 4x faster and has 4x smaller model size.

## OpenAI Connector

### Introduction

The OpenAI Connector is a powerful tool that integrates OpenAI's GPT-3.5 Turbo model to categorize and understand textual data.

It can be used for various natural language processing tasks, including data classification, summarization, and more.

### Learning from Data

The OpenAI Connector uses reinforcement learning to improve its performance.
Reinforcement learning is a machine learning paradigm where an agent learns to make decisions by interacting with an environment.
In this case, the OpenAI Connector is the agent, and the environment consists of user interactions and feedback.

#### Reinforcement Learning

Reinforcement learning in the OpenAI Connector involves providing feedback to the model to help it understand the desired behavior.
You can reinforce the model's responses by providing explicit reinforcement prompts.
The model then learns from these reinforcements to improve its future responses.

#### Feedback Loop

Learning from data and reinforcement is an iterative process.

Here's a typical feedback loop for improving the OpenAI Connector's performance:

- **Collect Feedback**: Collect feedback from users or automated testing to identify cases where the model's responses are incorrect or need improvement.
- **Create Reinforcement Prompts**: Based on the collected feedback, create reinforcement prompts that specify the correct category or behavior that the model should learn.
- **Apply Reinforcement**: Use the reinforcementLearn method to provide the reinforcement prompts to the model.
- **Analyze Performance**: Continuously monitor the model's performance and categorization results. Collect new data to assess how well the model is learning.
- **Repeat**: Iterate through this feedback loop to provide ongoing guidance to the model and improve its categorization accuracy.

## TensorFlow Connector

### MobileBERT NLP Model

Written with TensorFlow framework, MobileBERT is a light-weight version of BERT NLP model
(native language processing). It's a pre-trained model optimized to work with TensorFlow.js
package, which allows us to achieve full expierience of already trainde light-weight NLP model
with ability to run process of reinforcement learning during the whole working process of Flowify.

The model can be used to build a system that can answer users’ questions in natural language.
It was created using a pre-trained BERT model fine-tuned on SQuAD 1.1 dataset.

BERT, or Bidirectional Encoder Representations from Transformers, is a method of pre-training language representations which obtains state-of-the-art results on a wide array of Natural Language Processing tasks.
