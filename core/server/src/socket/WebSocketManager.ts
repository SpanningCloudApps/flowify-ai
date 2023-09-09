import { getLogger } from '../logger/logger';
import { dataProcessFacade } from '../facade/DataProcessFacade';

const logger = getLogger();

export enum WebSocketEventType {
  ACCEPTED = 'accepted',
  ERROR = 'error',
  REJECT = 'reject'
}

export class WebSocketManager {
  private static _instance = new WebSocketManager();

  private readonly connectedClients = {};

  static get instance(): WebSocketManager {
    return this._instance;
  }

  public initClient(client, actor) {
    this.connectedClients[actor] = client;
    client
      .on('close', () => {
        delete this.connectedClients[actor];
      });
  }

  public async publish(actor: string, data: Record<string, unknown>) {
    logger.info(`WEBSOCKET = [${actor}] send = ${JSON.stringify(data)}`);
    const event = {
      type: WebSocketEventType.ACCEPTED,
      data: {
        actor,
        workflowExecutionId: data.workflowExecutionId,
        responseType: data.type,
        response: data.result
      }
    };

    const recipientConnection = this.connectedClients[actor];
    if (recipientConnection) {
      recipientConnection.send(event);
    }
  }

  public async process(actor: string, clientData: Record<string, unknown>) {
    logger.info(`WEBSOCKET CONTINUE = [${actor}] receive = ${JSON.stringify(clientData)}`);
    const data = {
      actor,
      clientResponse: clientData.response,
      workflowExecutionId: clientData.workflowExecutionId,
      type: clientData.responseType
    };
    await dataProcessFacade.process(data);
  }

  public async start(actor: string, clientData: Record<string, unknown>, client: unknown) {
    this.initClient(client, actor);
    logger.info(`WEBSOCKET START = [${actor}] receive = ${JSON.stringify(clientData)}`);
    const data = {
      createdBy: actor,
      title: clientData.title,
      description: clientData.description,
      additionalInfo: clientData.additionalInfo
    };
    await dataProcessFacade.initiate(data);
  }
}

export const webSocketManager = WebSocketManager.instance;
