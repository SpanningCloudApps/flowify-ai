import config from 'config';

import { getLogger } from '../../logger/logger';
import { ClassificationResultMessage, ClientInteractionMessage } from '/ClassificationProcessorService';
import { DefaultQueueConfig, QueueConfig } from './queue/SQSQueueConfigProvider';
import { SqsMessage, SQSMessageProvider, SqsPollQueueStats } from './queue/SQSMessageProvider';

const logger = getLogger();

export class QueueService {

  private readonly workflowRequestQueue: string = '';
  private readonly workflowResultQueue: string = '';
  private readonly workflowStepInteractionRequestQueue: string = '';
  private readonly workflowStepInteractionResultQueue: string = '';

  private readonly sqs: SQSMessageProvider;

  private static _instance = new QueueService();

  static get instance(): QueueService {
    return this._instance;
  }

  constructor() {
    this.sqs = SQSMessageProvider.of({
      accessKeyId: config.get('aws.awsAccessKey'),
      secretAccessKey: config.get('aws.awsSecretKey'),
      region: config.get('aws.region'),
      endpoint: config.has('aws.localstack.endpoint') ? config.get('aws.localstack.endpoint') : undefined,
      maxRetries: undefined
    });
    this.workflowRequestQueue = 'workflowRequestQueue';
    this.workflowResultQueue = 'workflowResultQueue';
    this.workflowStepInteractionRequestQueue = 'workflowStepInteractionRequestQueue';
    this.workflowStepInteractionResultQueue = 'workflowStepInteractionResultQueue';
  }

  public async publishClassificationResult(data: ClassificationResultMessage) {
    logger.info(`Publish message to the queue ${this.workflowRequestQueue} data ${JSON.stringify(data)}`);

    const queueOpts = {
      sqsPrefix: config.get('sqs.prefix') as string,
      defaultConfig: config.get('sqs.default') as DefaultQueueConfig,
      originalConfig: config.get(`sqs.queues.${this.workflowRequestQueue}`) as QueueConfig
    };

    await this.sqs.sendMessage(queueOpts, data);
  }

  public async publishClientInteraction(data: ClientInteractionMessage) {
    logger.info(`Publish message to the queue ${this.workflowStepInteractionResultQueue} data ${JSON.stringify(data)}`);

    const queueOpts = {
      sqsPrefix: config.get('sqs.prefix') as string,
      defaultConfig: config.get('sqs.default') as DefaultQueueConfig,
      originalConfig: config.get(`sqs.queues.${this.workflowStepInteractionResultQueue}`) as QueueConfig
    };

    await this.sqs.sendMessage(queueOpts, data);
  }

  public async retrieveWorkflowResult(processMessage: (sqsMessage: SqsMessage, progress: SqsPollQueueStats) => any) {
    logger.info(`Poll message from the queue ${this.workflowResultQueue}`);

    const queueOpts = {
      sqsPrefix: config.get('sqs.prefix') as string,
      defaultConfig: config.get('sqs.default') as DefaultQueueConfig,
      originalConfig: config.get(`sqs.queues.${this.workflowResultQueue}`) as QueueConfig
    };
    const data = {
      visibilityTimeout: config.get('sqs.messageVisibilityTimeoutSeconds') as number,
      visibilityUpdateInterval: config.get('sqs.messageVisibilityUpdateIntervalSeconds') as number * 1000,
      stopPolling: () => false
    };

    await this.sqs.pollQueueWithVisibility(queueOpts, processMessage, data);
  }

  public async retrieveClientInteractionWorkflowResult(processMessage: (sqsMessage: SqsMessage, progress: SqsPollQueueStats) => any) {
    logger.info(`Poll message from the queue ${this.workflowStepInteractionRequestQueue}`);

    const queueOpts = {
      sqsPrefix: config.get('sqs.prefix') as string,
      defaultConfig: config.get('sqs.default') as DefaultQueueConfig,
      originalConfig: config.get(`sqs.queues.${this.workflowStepInteractionRequestQueue}`) as QueueConfig
    };
    const data = {
      visibilityTimeout: config.get('sqs.messageVisibilityTimeoutSeconds') as number,
      visibilityUpdateInterval: config.get('sqs.messageVisibilityUpdateIntervalSeconds') as number * 1000,
      stopPolling: () => false
    };

    await this.sqs.pollQueueWithVisibility(queueOpts, processMessage, data);
  }
}

export const queueService = QueueService.instance;
