/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import config from 'config';
import { CreateQueueCommand, GetQueueUrlCommand, GetQueueUrlCommandOutput, SQSClient } from '@aws-sdk/client-sqs';

export default class QueueService {

  private workflowRequestQueue: string = '';
  private workflowResultQueue: string = '';
  private workflowStepInteractionRequestQueue: string = '';
  private workflowStepInteractionResultQueue: string = '';
  private readonly pollingInterval: number;

  private readonly sqsClient: SQSClient;

  constructor() {
    this.pollingInterval = config.get('aws.sqs.pollIntervalMillis');

    const region: string = config.get('aws.region');
    const endpoint: string = config.get('aws.localstack.endpoint');
    this.sqsClient = new SQSClient({ region, endpoint });
  }

  public async initialize_queues() {
    const prefix = config.get('aws.sqs.prefix');
    this.workflowRequestQueue = await this.initQueue(`${prefix}_${config.get('aws.sqs.queues.workflowRequestQueue')}`);
    this.workflowResultQueue = await this.initQueue(`${prefix}_${config.get('aws.sqs.queues.workflowResultQueue')}`);
    this.workflowStepInteractionRequestQueue = await this.initQueue(`${prefix}_${config.get('aws.sqs.queues.workflowStepInteractionRequestQueue')}`);
    this.workflowStepInteractionResultQueue = await this.initQueue(`${prefix}_${config.get('aws.sqs.queues.workflowStepInteractionResultQueue')}`);
  }

  private async initQueue(queueName: string): Promise<string> {
    try {
      console.log(`Creating queue ${queueName}`);
      const createCommand = new CreateQueueCommand({ QueueName: queueName });
      await this.sqsClient.send(createCommand);
    } catch (e) {
      console.error(`Failed ot create queue`, e);
    }

    const getCommand = new GetQueueUrlCommand({ QueueName: queueName });
    let result: GetQueueUrlCommandOutput = await this.sqsClient.send(getCommand);
    return result.QueueUrl!;
  }

  public async subscribeToWorkflows() {
    console.log(`Subscribed to workflows ${this.workflowRequestQueue}`);
    return setInterval(async () => {
      console.log('Polling workflow requests queue');
    }, this.pollingInterval);
  }

  public async publishWorkflowResult(data: any) {
    console.log(`Publish message to the queue ${this.workflowResultQueue} data ${JSON.stringify(data)}`);
  }

  public async subscribeToStepResults() {
    console.log(`Subscribed to workflows ${this.workflowRequestQueue}`);
    return setInterval(async () => {
      console.log('Polling step result queue');
    }, this.pollingInterval);
  }

  public async publishStepDataRequest(data: any) {
    console.log(`Publish message to the queue ${this.workflowStepInteractionResultQueue} data ${JSON.stringify(data)}`);
  }

}
