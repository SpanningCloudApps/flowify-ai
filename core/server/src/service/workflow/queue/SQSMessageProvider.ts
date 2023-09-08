import { backOff } from 'exponential-backoff';
import { AwsClientFactory, AwsSettings } from './AwsClientFactory';
import {
  ChangeMessageVisibilityCommand,
  CreateQueueCommand,
  DeleteMessageCommand,
  GetQueueUrlCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
  SetQueueAttributesCommand
} from '@aws-sdk/client-sqs';
import SQSDeadLetterProvider from './SQSDeadLetterProvider';
import { DefaultQueueConfig, QueueConfig, SQSQueueConfigProvider } from './SQSQueueConfigProvider';
import { getLogger } from '../../../logger/logger';

const logger = getLogger();

/**
 * SQS Message
 *
 * @see https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Message.html
 */
export type SqsMessage = {
  Body?: string;
  MD5OfBody?: string;
  MessageId?: string;
  ReceiptHandle?: string;
};

export type SqsPollQueueStats = {
  numRequested: number;
  numReceived: number;
};

export type QueueUrlResponse = {
  QueueUrl: string;
}

export class SQSMessageProvider {

  private queueUrls = new Map();
  private readonly sqs;
  private readonly sqsSDeadLetterProvider;

  private constructor(settings: AwsSettings) {
    this.sqs = AwsClientFactory.of(settings).getSqsClient();
    this.sqsSDeadLetterProvider = SQSDeadLetterProvider.of(settings);
  }

  public static of(settings: AwsSettings) {
    return new SQSMessageProvider(settings);
  }

  public cleanCacheQueueUrlsInfo() {
    this.queueUrls.clear();
  }

  /**
   * Gets sqs queue url from cash and if not found creates one.
   *
   * @param opts - The queue configuration.
   * @returns {Promise} - A promise which resolves to a SQS ReceiveMessageResult object.
   */
  public async getQueueUrl(
    opts: {
      sqsPrefix: string;
      defaultConfig: DefaultQueueConfig;
      originalConfig: QueueConfig;
    }
  ): Promise<QueueUrlResponse> {
    const queueConfig: QueueConfig = SQSQueueConfigProvider.getQueueConfig(opts);
    const cachedUrl: QueueUrlResponse = this.queueUrls.get(queueConfig.name);
    if (cachedUrl) {
      return cachedUrl;
    }

    const createQueueParams: any = {
      QueueName: queueConfig.name,
      Attributes: {
        MessageRetentionPeriod: queueConfig.retentionPeriodSecs
      }
    };

    // dlqUrl is not empty, null or undefined means that dead-letter config is present and enabled.
    const dlqArn: string | undefined = await this.sqsSDeadLetterProvider.getDeadLetterQueueArn(opts);
    if (dlqArn) {
      createQueueParams.Attributes.RedrivePolicy = `{
          "deadLetterTargetArn": "${dlqArn}",
          "maxReceiveCount": "${queueConfig.deadLetter && queueConfig.deadLetter.maxReceives}"
        }`;
    }

    try {
      const response = await this.sqs.send(new CreateQueueCommand(createQueueParams));
      const data: QueueUrlResponse = {
        QueueUrl: response.QueueUrl || ''
      };
      this.queueUrls.set(queueConfig.name, data);
      return data;
    } catch (e) {
      if (e.name === 'QueueNameExists') {
        return await this.getQueueIfAlreadyExists(opts);
      }
      throw e;
    }
  }

  public async getQueueIfAlreadyExists(
    opts: {
      sqsPrefix: string;
      defaultConfig: DefaultQueueConfig;
      originalConfig: QueueConfig;
    }
  ): Promise<QueueUrlResponse> {
    const queueConfig: QueueConfig = SQSQueueConfigProvider.getQueueConfig(opts);
    const response = await this.sqs.send(new GetQueueUrlCommand({ QueueName: queueConfig.name }));
    const data: QueueUrlResponse = {
      QueueUrl: response.QueueUrl || ''
    };
    this.queueUrls.set(queueConfig.name, data);
    const dlqArn: string | undefined = await this.sqsSDeadLetterProvider.getDeadLetterQueueArn(opts);
    if (dlqArn) {
      const params = {
        QueueUrl: `${data.QueueUrl}`,
        Attributes: {
          RedrivePolicy: `{
                "deadLetterTargetArn": "${dlqArn}",
                "maxReceiveCount": "${queueConfig.deadLetter && queueConfig.deadLetter.maxReceives}"
              }`
        }
      };
      await this.sqs.send(new SetQueueAttributesCommand(params));
    }

    return data; // Need to return data from original queue
  }

  /**
   * Checks the specified queue for a message, waiting up to waitTimeSeconds before returning. If an Error occurs, 4
   * more attempts are made to read from the queue, backing off exponentially between each attempt.
   *
   * @param queueUrl - The URL of the queue to read from.
   * @param waitTimeSeconds - The amount of time to wait for a message to appear on the queue before returning.
   * @param visibilityTimeout - The duration (in seconds) that the received messages are hidden
   *  from subsequent retrieve requests after being retrieved by a ReceiveMessage request.
   * @returns {Promise} - A promise which resolves to a SQS ReceiveMessageResult object.
   */
  public receiveMessageWithRetry(queueUrl: string, waitTimeSeconds: number, visibilityTimeout: number) {
    const functionToRetry = () => {
      return this.sqs.send(new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        WaitTimeSeconds: waitTimeSeconds,
        VisibilityTimeout: visibilityTimeout
      }));
    };
    const errorHandler = (error: any) => {
      logger.error(
        `Error calling SQS.receiveMessageWithRetry(). queueUrl=[${queueUrl}] waitTimeSeconds=[${waitTimeSeconds}]`,
        error);
      throw error;
    };

    return backOff(functionToRetry, {
      timeMultiple: 2,
      numOfAttempts: 5,
      retry: errorHandler
    });
  }

  /**
   * Reads a message from the specified queue.
   *
   * @param opts - The queue configuration.
   * @param [waitTimeSeconds] - The amount of time to wait for a message to appear on the queue before returning.
   * If not provided, will return immediately after checking for a message.
   * @param [visibilityTimeout] - The duration (in seconds) that the received messages are hidden
   *  from subsequent retrieve requests after being retrieved by a ReceiveMessage request. Default: 60
   * @returns {Promise} - A promise which resolves to an SQS message,
   * or null if no message appeared before the waitTimeSeconds expired.
   */
  public async receiveMessage(
    opts: {
      sqsPrefix: string;
      defaultConfig: DefaultQueueConfig;
      originalConfig: QueueConfig;
    },
    waitTimeSeconds = 0,
    visibilityTimeout = 60
  ): Promise<SqsMessage | undefined> {
    // create or get the queue url
    const queueResponse: QueueUrlResponse = await this.getQueueUrl(opts);
    const data = await this.receiveMessageWithRetry(queueResponse.QueueUrl, waitTimeSeconds, visibilityTimeout);

    let message: SqsMessage | undefined;

    if (data.Messages) {
      message = data.Messages[0];
      // validate that the message body is valid JSON
      try {
        const messageBody = JSON.parse(message?.Body || '');

        logger.debug({ messageBody }, `Received SQS message. MessageId=[${message?.MessageId}]`);
      } catch (err) {
        logger.error({ message }, 'Queue contained invalid message body.');
        return undefined;
      }
    } else {
      logger.debug(`No message found after waiting for ${waitTimeSeconds} seconds`);
    }

    // Return the message, even if we received nothing.
    return message as SqsMessage | undefined;
  }

  /**
   * Removes a message from the specified queue.
   *
   * @param opts - The queue configuration.
   * @param message - The message for deletion.
   * @returns {Promise} - A promise.
   */
  public async deleteMessage(
    opts: {
      sqsPrefix: string;
      defaultConfig: DefaultQueueConfig;
      originalConfig: QueueConfig;
    },
    message: SqsMessage
  ) {
    const data: QueueUrlResponse = await this.getQueueUrl(opts);
    return this.sqs.send(new DeleteMessageCommand({
      QueueUrl: data.QueueUrl,
      ReceiptHandle: message.ReceiptHandle
    }));
  }

  /**
   * Updates the visibility timeout for an SQS message.
   *
   * @param opts - The queue configuration.
   * @param message - The SQSMessage to update.
   * @param timeout - The value in seconds to add to the message's visibility timeout.
   */
  public async updateVisibilityTimeout(
    opts: {
      sqsPrefix: string;
      defaultConfig: DefaultQueueConfig;
      originalConfig: QueueConfig;
    },
    message: SqsMessage,
    timeout: number
  ) {
    const data: QueueUrlResponse = await this.getQueueUrl(opts);
    return this.sqs.send(new ChangeMessageVisibilityCommand({
      QueueUrl: data.QueueUrl,
      ReceiptHandle: message.ReceiptHandle,
      VisibilityTimeout: timeout
    }));
  }

  /**
   * Read messages from a queue with setting visibility timeout and pass them to a callback function.
   * Delete message after it is processed (callback function either resolves or rejects)
   *
   * @param queueOpts - The queue configuration.
   * @param callback - The function called with the dequeued {@link SqsMessage}
   * @param opts - Options for poll method
   * @param opts.waitTimeSeconds - The amount of time to wait for a message to appear on the queue before returning.
   * @param opts.limit - Number of messages to process before stopping.  Default value is no limit.
   * @param opts.stopPolling - Function to indicate whether to stop polling.  Default value never stops polling.
   * @returns Promise that resolves with {@link SqsPollQueueStats} after [limit] messages have
   * been received or the [stopPolling] callback returns true.
   */
  public pollQueueWithVisibility(
    queueOpts: {
      sqsPrefix: string;
      defaultConfig: DefaultQueueConfig;
      originalConfig: QueueConfig;
    },
    callback: (sqsMessage: SqsMessage, progress: SqsPollQueueStats) => any,
    opts: {
      visibilityTimeout: number;
      visibilityUpdateInterval: number;
      waitTimeSeconds?: number;
      limit?: number | false;
      stopPolling?: () => boolean | Promise<boolean>;
    }
  ): Promise<SqsPollQueueStats> {
    const visibilityTimeout = opts.visibilityTimeout;
    const visibilityUpdateInterval = opts.visibilityUpdateInterval;
    const queueConfig: QueueConfig = SQSQueueConfigProvider.getQueueConfig(queueOpts);
    const optsWithDefaultValues = {
      waitTimeSeconds: queueConfig.waitTimeSecs,
      limit: false,
      stopPolling: () => false,
      ...opts
    };
    const { waitTimeSeconds, limit, stopPolling } = optsWithDefaultValues;
    return new Promise<SqsPollQueueStats>((resolve, reject) => {
      let numRequested = 0;
      let numReceived = 0;

      const waitOnMessage = async () => {
        try {
          numRequested++;

          const sqsMessage = await this.receiveMessage(queueOpts, waitTimeSeconds);

          if (sqsMessage) {
            const updateVisibility = setInterval(async () => {
              try {
                await this.updateVisibilityTimeout(queueOpts, sqsMessage, visibilityTimeout);
              } catch (e) {
                logger.error(e, 'The updateVisibilityTimeout failed during SQS polling.');
              }
            }, visibilityUpdateInterval);

            numReceived++;
            try {
              await callback(sqsMessage, {
                numRequested,
                numReceived
              });
              await this.deleteMessage(queueOpts, sqsMessage);
            } catch (callbackError) {
              logger.error(callbackError.message, 'The pollQueue callback failed');
              if (!queueConfig.deadLetter || !queueConfig.deadLetter.enabled) {
                // In case DeadLetter is not configured need to remove message in catch block from the queue
                // otherwise after X retries message will be moved to the Dead Letter.
                await this.deleteMessage(queueOpts, sqsMessage);

                // Need to reject promise to stop polling mechanism in case Dead Letter is not configured.
                reject(callbackError);
              }
            } finally {
              clearInterval(updateVisibility);
            }
          }

          // Reached limit or stopped, resolve promise
          if ((stopPolling && stopPolling()) || (limit && numReceived >= limit)) {
            // Reached limit, resolve promise with stats
            resolve({ numRequested, numReceived });
          } else {
            // Let's do it again!
            setImmediate(waitOnMessage);
          }
        } catch (err) {
          logger.error(err, 'Polling failed');
          // SQS error, reject promise
          reject(err);
        }
      };

      // Start polling
      waitOnMessage();
    });
  }

  public async sendMessage(
    opts: {
      sqsPrefix: string;
      defaultConfig: DefaultQueueConfig;
      originalConfig: QueueConfig;
    },
    message: string
  ) {
    const data: QueueUrlResponse = await this.getQueueUrl(opts);
    return this.sqs.send(new SendMessageCommand({
      QueueUrl: data.QueueUrl,
      MessageBody: JSON.stringify(message)
    }));
  }

}
