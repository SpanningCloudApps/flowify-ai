import { readFileSync } from 'fs';
import path from 'path';

import { FastifyInstance } from 'fastify';
import { getLogger } from '../logger/logger';
import { WebSocketEventType, webSocketManager } from '../socket/WebSocketManager';

const logger = getLogger();

const clientInteractionRoute = async (server: FastifyInstance): Promise<void> => {
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
              case 'initiate':
                await webSocketManager.initiate(json.actor, json.data, socket);
                break;
              case 'start':
                await webSocketManager.start(json.actor, json.data);
                break;
              case 'process':
                await webSocketManager.process(json.actor, json.data);
                break;

              default:
                sendMessage({ type: WebSocketEventType.REJECT, data: 'NOT SUPPORTED' });
                break;
            }
          } catch (error) {
            logger.error('An error occurred during flowify chat', error);
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
