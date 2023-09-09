import { fastify } from 'fastify';
import { FastifyInstance } from 'fastify/types/instance';
import { addOpenAiRoutes } from 'mapping/OpenAIRoutesMapping';

const initServer = (): FastifyInstance => {
  const server = fastify();

  server.get('/healthcheck', async (_request, _reply) => {
    return 'ok';
  });

  addOpenAiRoutes(server);

  return server;
};

export {
  initServer
};
