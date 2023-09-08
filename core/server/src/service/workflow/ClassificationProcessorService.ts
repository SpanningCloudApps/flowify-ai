import { queueService } from './QueueService';
import { SqsMessage } from './queue/SQSMessageProvider';
import { webSocketService } from '../socket/WebSocketService';

export interface ClassificationResultMessage {
  workflowName: string;
  actor: string;
}

export interface ClientInteractionMessage {
  workflowExecutionId: string;
  type: string;
  clientResponse: string;
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
    const clientInteraction = {
      workflowExecutionId: data.workflowExecutionId,
      type: data.type,
      clientResponse: data.clientResponse,
      actor: data.actor
    };
    await queueService.publishClientInteraction(clientInteraction);
  }

  public async retrieveWorkflowResult() {
    const processMessage = async (sqsMessage: SqsMessage) => {
      // https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Message.html
      // The body is not required property
      const data: unknown = JSON.parse(sqsMessage.Body!);
      const { actor } = data;

      await webSocketService.publish(actor, { result: data.result });
    };

    await queueService.retrieveWorkflowResult(processMessage);
  }

  public async retrieveClientInteractionWorkflowRequest() {
    const processMessage = async (sqsMessage: SqsMessage) => {
      // https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Message.html
      // The body is not required property
      const data: unknown = JSON.parse(sqsMessage.Body!);
      const { actor } = data;
      const workflowRequest = {
        question: data.question,
        workflowExecutionId: data.workflowExecutionId,
        type: data.type,
        actor: data.actor
      };
      await webSocketService.publish(actor, workflowRequest);
    };

    await queueService.retrieveClientInteractionWorkflowRequest(processMessage);
  }

  // DONT MAKE ASYNC. THIS IS INFINITY QUEUE POLLING
  public poll() {
    this.retrieveClientInteractionWorkflowRequest();
    this.retrieveWorkflowResult();
  }
}

export const classificationProcessorService = ClassificationProcessorService.instance;
