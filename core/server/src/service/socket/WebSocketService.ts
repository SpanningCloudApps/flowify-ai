import { getLogger } from '../../logger/logger';

const logger = getLogger();

// TODO: Integrate with Anton
export class WebSocketService {
  private static _instance = new WebSocketService();

  static get instance(): WebSocketService {
    return this._instance;
  }

  public async publish(actor: string, data: Record<string, unknown>) {
    logger.info(`WEBSOCKET = [${actor}] send = ${JSON.stringify(data)}`);
  }
}

export const webSocketService = WebSocketService.instance;
