import { DefaultQueueConfig, QueueConfig, SQSQueueConfigProvider } from '/SQSQueueConfigProvider';
import { AwsClientFactory, AwsSettings } from '/AwsClientFactory';
import { CreateQueueCommand, GetQueueAttributesCommand, GetQueueUrlCommand } from '@aws-sdk/client-sqs';

export default class SQSDeadLetterProvider {
  // dlq stands for 'Dead Letter Queue'
  private dlqUrls = new Map();

  private readonly sqs;

  private constructor(settings: AwsSettings) {
    this.sqs = AwsClientFactory.of(settings).getSqsClient();
  }

  public static of(settings: AwsSettings) {
    return new SQSDeadLetterProvider(settings);
  }

  public cleanCacheDlqQueueUrlsInfo(): void {
    this.dlqUrls.clear();
  }

  public async getDeadLetterQueueArn(
    opts: {
      sqsPrefix: string;
      defaultConfig: DefaultQueueConfig;
      originalConfig: QueueConfig;
    }
  ): Promise<string | undefined> {
    const queueConfig = SQSQueueConfigProvider.getQueueConfig(opts);

    if (queueConfig.deadLetter && queueConfig.deadLetter.enabled) {
      const dlqName = queueConfig.name.indexOf(opts.sqsPrefix) !== -1
        ? `${queueConfig.name}_dlq`
        : `${opts.sqsPrefix}_${queueConfig.name}_dlq`;

      const cachedDlqArn = this.dlqUrls.get(dlqName);
      if (cachedDlqArn) {
        return cachedDlqArn;
      }

      try {
        await this.sqs.send(new CreateQueueCommand({
          QueueName: dlqName,
          Attributes: {
            MessageRetentionPeriod: `${queueConfig.deadLetter.retentionPeriodSecs}`
          }
        }));
      } catch (e) {
        if (e?.code !== 'QueueAlreadyExists') {
          throw e;
        }
      }

      return this.getDeadLetterQueueArnFromSqs(dlqName);
    }

    return undefined;
  }

  public async getDeadLetterQueueArnFromSqs(dlqName: string): Promise<string | undefined> {
    const getUrlResponse = await this.sqs.send(new GetQueueUrlCommand({ QueueName: dlqName }));
    const getQueueAttributesResponse = await this.sqs.send(
      new GetQueueAttributesCommand({ QueueUrl: getUrlResponse.QueueUrl || '', AttributeNames: ['QueueArn'] }));
    const dlqArn = getQueueAttributesResponse.Attributes && getQueueAttributesResponse.Attributes.QueueArn;
    if (dlqArn) {
      this.dlqUrls.set(dlqName, dlqArn);
    }
    return dlqArn;
  }
}
