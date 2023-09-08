import { readFileSync } from 'fs';
import path from 'path';

import { FastifyInstance } from 'fastify';
import { getLogger } from '../logger/logger';

const logger = getLogger();

const history = [];

const clientInteractionRoute = async (server: FastifyInstance): Promise<void> => {
  await server.register((app, _, done) => {
    app.get('/', async (request, reply) => {
      reply.type('text/html');
      return readFileSync(path.join(__dirname, 'websocket_page/chat.html'));
    });

    server.get('/chat',
      { websocket: true },
      (connection) => {
        const { socket } = connection;

        history.map(msg => socket.push(msg));

        socket.on('message', function (message) {
          try {
            const json = JSON.parse(message.toString());
            switch (json.type) {
              case 'message': {
                const messageEvent = JSON.stringify({
                  type: 'accepted',
                  data: `${new Date().toISOString()}: ${json.data}`
                });

                const websocketServer = server.websocketServer;
                logger.info('broadcasting to all clients', websocketServer.clients.size);
                for (const client of websocketServer.clients) {
                  client.send(messageEvent);
                }

                history.push(messageEvent);
              }
                break;

              default:
                sendMessage({ type: 'reject', data: 'wrong type' });
                break;
            }
          } catch (error) {
            sendMessage({ type: 'error', data: error.message });
          }
        });

        function sendMessage(message) {
          socket.push(JSON.stringify(message));
        }
      });

    done();
  }, { prefix: 'ecosystem/api/clients' });
};

export {
  clientInteractionRoute
};
