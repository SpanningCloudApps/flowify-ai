/**
 * SQS Message
 *
 * @see https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Message.html
 */
export type QueueConfig = {
  name: string;
  waitTimeSecs?: number;
  retentionPeriodSecs?: number;
  deadLetter?: {
    enabled: boolean;
    maxReceives?: number;
    retentionPeriodSecs?: number;
  };
}

export type DefaultQueueConfig = {
  waitTimeSecs: number;
  retentionPeriodSecs: number;
  deadLetter?: {
    maxReceives: number;
    retentionPeriodSecs: number;
  };
}

/**
 *
 * Extracts config for sqs queue by the name of config. Sets default values if config does not have one.
 * @param opts - The queue configuration.
 * @returns {Promise} - A promise which resolves to a SQS ReceiveMessageResult object.
 */
function getQueueConfig(
  opts: {
    sqsPrefix: string;
    defaultConfig: DefaultQueueConfig;
    originalConfig: QueueConfig;
  }
): QueueConfig {
  const sqsQueuePrefix = opts.sqsPrefix;
  const defaultQueueConfig = opts.defaultConfig;
  const originalQueueConfig = opts.originalConfig;
  const queueConfig = JSON.parse(JSON.stringify(originalQueueConfig)); // deep clone

  queueConfig.name = `${sqsQueuePrefix}_${queueConfig.name}`;

  if (!queueConfig.waitTimeSecs) {
    queueConfig.waitTimeSecs = defaultQueueConfig.waitTimeSecs;
  }

  if (!queueConfig.retentionPeriodSecs) {
    queueConfig.retentionPeriodSecs = defaultQueueConfig.retentionPeriodSecs;
  }

  if (queueConfig.deadLetter && queueConfig.deadLetter.enabled) {
    if (!queueConfig.deadLetter.maxReceives) {
      queueConfig.deadLetter.maxReceives = defaultQueueConfig.deadLetter?.maxReceives || 5;
    }

    if (!queueConfig.deadLetter.retentionPeriodSecs) {
      const defaultPeriod = 1209600; // 14 days
      queueConfig.deadLetter.retentionPeriodSecs = defaultQueueConfig.deadLetter?.retentionPeriodSecs || defaultPeriod;
    }
  }

  return queueConfig as QueueConfig;
}

export const SQSQueueConfigProvider = {
  getQueueConfig
};
