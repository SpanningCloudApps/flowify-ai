import config from 'config';

import {
  CreateQueueCommand,
  DeleteMessageCommand,
  GetQueueUrlCommand,
  GetQueueUrlCommandOutput,
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  SQSClient
} from '@aws-sdk/client-sqs';

import { getLogger } from '../../logger/logger';
import { ClassificationResultData } from './ClassificationProcessorService';

const logger = getLogger();

export class QueueService {

  private workflowRequestQueue: string = '';
  private workflowResultQueue: string = '';
  private workflowStepInteractionRequestQueue: string = '';
  private workflowStepInteractionResultQueue: string = '';
  private readonly pollingInterval: number;

  private readonly sqsClient: SQSClient;

  private static _instance = new QueueService();

  static get instance(): QueueService {
    return this._instance;
  }

  constructor() {
    this.pollingInterval = config.get('aws.sqs.pollIntervalMillis');

    const region: string = config.get('aws.region');
    const endpoint: string = config.get('aws.localstack.endpoint');
    this.sqsClient = new SQSClient({ region, endpoint });
  }

  public async initializeQueues() {
    const prefix = config.get('aws.sqs.prefix');
    this.workflowRequestQueue = await this.initQueue(`${prefix}_${config.get('aws.sqs.queues.workflowRequestQueue')}`);
    this.workflowResultQueue = await this.initQueue(`${prefix}_${config.get('aws.sqs.queues.workflowResultQueue')}`);
    this.workflowStepInteractionRequestQueue = await this.initQueue(`${prefix}_${config.get('aws.sqs.queues.workflowStepInteractionRequestQueue')}`);
    this.workflowStepInteractionResultQueue = await this.initQueue(`${prefix}_${config.get('aws.sqs.queues.workflowStepInteractionResultQueue')}`);
  }

  private async initQueue(queueName: string): Promise<string> {
    try {
      logger.info(`Creating queue ${queueName}`);
      const createCommand = new CreateQueueCommand({ QueueName: queueName });
      await this.sqsClient.send(createCommand);
    } catch (e) {
      logger.error(`Failed ot create queue`, e);
    }

    const getCommand = new GetQueueUrlCommand({ QueueName: queueName });
    let result: GetQueueUrlCommandOutput = await this.sqsClient.send(getCommand);
    return result.QueueUrl!;
  }

  public async subscribeToWorkflows(handler: (message: any) => Promise<void>) {
    logger.info(`Subscribed to workflows ${this.workflowRequestQueue}`);
    return setInterval(async () => {
      try {
        logger.info(`Polling for messages from ${this.workflowRequestQueue}`);
        const command = new ReceiveMessageCommand({ QueueUrl: this.workflowRequestQueue });
        const messages: ReceiveMessageCommandOutput = await this.sqsClient.send(command);
        if (messages?.Messages?.length) {
          const message = messages.Messages[0];
          await handler(JSON.parse(message.Body as string));
          const deleteCommand = new DeleteMessageCommand({
            QueueUrl: this.workflowRequestQueue,
            ReceiptHandle: message.ReceiptHandle
          });
          await this.sqsClient.send(deleteCommand);
        }
      } catch (e) {
        logger.error(`Failed to read message from the queue`, e);
      }
    }, this.pollingInterval);
  }

  public async publishClassifier(data: ClassificationResultData) {
    logger.info(`Publish message to the queue ${this.workflowResultQueue} data ${JSON.stringify(data)}`);
  }

  public async subscribeToStepResults(handler: (message: any) => Promise<void>) {
    logger.info(`Subscribed to step results ${this.workflowStepInteractionResultQueue}`);
    return setInterval(async () => {
      try {
        logger.info(`Polling for messages from ${this.workflowStepInteractionResultQueue}`);
        const command = new ReceiveMessageCommand({ QueueUrl: this.workflowStepInteractionResultQueue });
        const messages: ReceiveMessageCommandOutput = await this.sqsClient.send(command);
        if (messages?.Messages?.length) {
          const message = messages.Messages[0];
          await handler(JSON.parse(message.Body as string));
          const deleteCommand = new DeleteMessageCommand({
            QueueUrl: this.workflowRequestQueue,
            ReceiptHandle: message.ReceiptHandle
          });
          await this.sqsClient.send(deleteCommand);
        }
      } catch (e) {
        logger.error(`Failed to read message from the queue`, e);
      }
    }, this.pollingInterval);
  }

  public async publishStepDataRequest(data: any) {
    logger.info(`Publish message to the queue ${this.workflowStepInteractionResultQueue} data ${JSON.stringify(data)}`);
  }
}

export const queueService = QueueService.instance;


// "workflowRequestQueue": "workflow_requests", - PUSH CLASSIFIER
//   "workflowResultQueue": "workflow_results", - SUBSCRIBE FOR SUCCESS/FAI:ED RESULT TO USER
//   "workflowStepInteractionRequestQueue": "workflow_step_interaction_request", - SUBSCRIBE FOR USER DATA ADDITIONAL
//   "workflowStepInteractionResultQueue": "workflow_step_interaction_result" - PUSH USER DATA ADDITIONAL
