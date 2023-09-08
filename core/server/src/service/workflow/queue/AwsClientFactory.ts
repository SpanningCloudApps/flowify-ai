import { SQSClient } from '@aws-sdk/client-sqs';

export type AwsSettings = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  endpoint: string | undefined;
  maxRetries: number | undefined;
}

export class AwsClientFactory {

  private sqsClient: SQSClient | null = null;

  private constructor(readonly settings: AwsSettings) {
  }

  static of(settings: AwsSettings): AwsClientFactory {
    return new AwsClientFactory(settings);
  }

  public getSqsClient(): SQSClient {
    if (!this.sqsClient) {
      this.sqsClient = new SQSClient({
        endpoint: this.settings.endpoint,
        credentials: {
          accessKeyId: this.settings.accessKeyId,
          secretAccessKey: this.settings.secretAccessKey
        },
        region: this.settings.region
      });
    }

    return this.sqsClient;
  }
}
