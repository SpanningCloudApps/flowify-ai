import { readFileSync } from 'fs';
import path from 'path';

import { FastifyInstance } from 'fastify';
import { getLogger } from '../logger/logger';
import { WebSocketEventType, webSocketManager } from '../socket/WebSocketManager';

const logger = getLogger();

const clientInteractionRoute = async (server: FastifyInstance): Promise<void> => {
  const websocketServer = server.websocketServer;
  webSocketManager.init(websocketServer);
  await server.register((app, _, done) => {
    app.get('/', async (request, reply) => {
      reply.type('text/html');
      return readFileSync(path.join(__dirname, '../../websocket_page/chat.html'));
    });

    app.get('/chat',
      { websocket: true },
      (connection) => {
        const { socket } = connection;

        socket.on('message', async message => {
          try {
            const json = JSON.parse(message.toString());
            switch (json.type) {
              case 'message': {
                logger.info(`broadcasting to all clients. Data ${json.data}`);
                await webSocketManager.process(json.data);
              }
                break;

              default:
                sendMessage({ type: WebSocketEventType.REJECT, data: 'wrong type' });
                break;
            }
          } catch (error) {
            sendMessage({ type: WebSocketEventType.ERROR, data: error.message });
          }
        });

        function sendMessage(message) {
          socket.send(JSON.stringify(message));
        }
      });

    done();
  }, { prefix: 'ecosystem/api/clients' });
};

export {
  clientInteractionRoute
};
