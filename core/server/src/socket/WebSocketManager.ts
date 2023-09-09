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

  private readonly connectedClients = new Set();

  static get instance(): WebSocketManager {
    return this._instance;
  }

  public init(websocketServer) {
    if (!this.websocketServer) {
      this.websocketServer = websocketServer;
      if (this.websocketServer) {
        this.websocketServer
          .on('connection', client => {
            this.connectedClients.add(client);
          })
          .on('close', client => {
            this.connectedClients.delete(client);
          });
      }
    }
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

    for (const client of this.websocketServer.clients) {
      client.send(event);
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

  public async start(actor: string, clientData: Record<string, unknown>) {
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
