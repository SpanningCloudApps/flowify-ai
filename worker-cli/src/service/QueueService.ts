/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import config from 'config';
import { SQSClient, CreateQueueCommand } from '@aws-sdk/client-sqs';

export default class QueueService {

  private readonly workflowRequestQueue: string;
  private readonly workflowResultQueue: string;
  private readonly workflowStepInteractionRequestQueue: string;
  private readonly workflowStepInteractionResultQueue: string;
  private readonly sqsClient: SQSClient;

  constructor() {
    const prefix = config.get('aws.sqs.prefix');
    this.workflowRequestQueue = `${prefix}_${config.get('aws.sqs.queues.workflowRequestQueue')}`;
    this.workflowResultQueue = `${prefix}_${config.get('aws.sqs.queues.workflowResultQueue')}`;
    this.workflowStepInteractionRequestQueue = `${prefix}_${config.get('aws.sqs.queues.workflowStepInteractionRequestQueue')}`;
    this.workflowStepInteractionResultQueue = `${prefix}_${config.get('aws.sqs.queues.workflowStepInteractionResultQueue')}`;

    const region: string = config.get('aws.region');
    const endpoint: string = config.get('aws.localstack.endpoint')
    this.sqsClient = new SQSClient({ region, endpoint });
  }

  public async initialize_queues() {
    try {
      console.log(`Creating queue ${this.workflowRequestQueue}`);
      const command = new CreateQueueCommand({ QueueName: this.workflowRequestQueue });
      await this.sqsClient.send(command);
    } catch(e) {
      console.error(`Failed ot create queue`, e);
    }

    try {
      console.log(`Creating queue ${this.workflowResultQueue}`);
      const command = new CreateQueueCommand({ QueueName: this.workflowResultQueue });
      await this.sqsClient.send(command);
    } catch(e) {
      console.error(`Failed ot create queue`, e);
    }

    try {
      console.log(`Creating queue ${this.workflowStepInteractionRequestQueue}`);
      const command = new CreateQueueCommand({ QueueName: this.workflowStepInteractionRequestQueue });
      await this.sqsClient.send(command);
    } catch(e) {
      console.error(`Failed ot create queue`, e);
    }

    try {
      console.log(`Creating queue ${this.workflowStepInteractionResultQueue}`);
      const command = new CreateQueueCommand({ QueueName: this.workflowStepInteractionResultQueue });
      await this.sqsClient.send(command);
    } catch(e) {
      console.error(`Failed ot create queue`, e);
    }
  }

  public async subscribeToWorkflows() {
    console.log(`Subscribed to workflows ${this.workflowRequestQueue}`);
  }

  public async publishWorkflowResult(data: any) {
    console.log(`Publish message to the queue ${this.workflowResultQueue} data ${JSON.stringify(data)}`);
  }

  public async subscribeToStepResults() {
    console.log(`Subscribed to step results for the queue ${this.workflowStepInteractionRequestQueue}`);
  }

  public async publishStepDataRequest(data: any) {
    console.log(`Publish message to the queue ${this.workflowStepInteractionResultQueue} data ${JSON.stringify(data)}`);
  }

}
