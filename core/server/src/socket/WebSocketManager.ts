import { getLogger } from '../logger/logger';
import { dataProcessFacade } from '../facade/DataProcessFacade';
import WebSocket from 'ws';

const logger = getLogger();

export enum WebSocketEventType {
  ACCEPTED = 'accepted',
  ERROR = 'error',
  REJECT = 'reject'
}

export class WebSocketManager {
  private static _instance = new WebSocketManager();

  private websocketServer: WebSocket.Server | null = null;

  static get instance(): WebSocketManager {
    return this._instance;
  }

  public init(websocketServer) {
    if (!this.websocketServer) {
      this.websocketServer = websocketServer;
    }
  }

  public async publish(actor: string, data: Record<string, unknown>) {
    logger.info(`WEBSOCKET = [${actor}] send = ${JSON.stringify(data)}`);
    const event = {
      actor,
      workflowExecutionId: data.workflowExecutionId,
      responseType: data.type,
      data: data.result,
      type: WebSocketEventType.ACCEPTED
    };

    for (const client of this.websocketServer.clients) {
      client.send(event);
    }
  }

  public async process(actor: string, clientData: Record<string, unknown>) {
    logger.info(`WEBSOCKET = [${actor}] receive = ${JSON.stringify(data)}`);
    const data = {
      actor,
      clientResponse: clientData.response,
      workflowExecutionId: clientData.workflowExecutionId,
      type: clientData.responseType
    };
    await dataProcessFacade.process(data);
  }
}

export const webSocketManager = WebSocketManager.instance;
