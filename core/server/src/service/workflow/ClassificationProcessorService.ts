import { queueService } from './QueueService';
import { SqsMessage } from './queue/SQSMessageProvider';
import { webSocketService } from '../socket/WebSocketService';

export interface ClassificationResultMessage {
  workflowName: string;
  actor: string;
}

export interface ClientInteractionMessage {
  workflowExecutionId: string;
  actor: string;
}

export class ClassificationProcessorService {
  private static _instance = new ClassificationProcessorService();

  static get instance(): ClassificationProcessorService {
    return this._instance;
  }

  public async publishClassificationResult(data: Record<string, unknown>) {
    await queueService.publishClassificationResult({ workflowName: data.workflowName, actor: data.actor });
  }

  public async publishClientInteraction(data: Record<string, unknown>) {
    await queueService.publishClientInteraction({ workflowExecutionId: data.workflowExecutionId, actor: data.actor });
  }

  public async retrieveWorkflowResult() {
    const processMessage = async (sqsMessage: SqsMessage) => {
      // https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Message.html
      // The body is not required property
      const data: unknown = JSON.parse(sqsMessage.Body!);
      const { actor } = data;

      await webSocketService.publish(actor, data);
    };

    await queueService.retrieveWorkflowResult(processMessage);
  }

  public async retrieveClientInteractionWorkflowResult() {
    const processMessage = async (sqsMessage: SqsMessage) => {
      // https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Message.html
      // The body is not required property
      const data: unknown = JSON.parse(sqsMessage.Body!);
      const { actor } = data;

      await webSocketService.publish(actor, data);
    };

    await queueService.retrieveClientInteractionWorkflowResult(processMessage);
  }

  // DONT MAKE ASYNC. THIS IS INFINITY QUEUE POLLING
  public poll() {
    this.retrieveClientInteractionWorkflowResult();
    this.retrieveWorkflowResult();
  }
}

export const classificationProcessorService = ClassificationProcessorService.instance;
