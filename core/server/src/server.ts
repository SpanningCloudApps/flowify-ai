import config from 'config';

import fastifySwagger from '@fastify/swagger';
import websocket from '@fastify/websocket';
import fastify, { FastifyError, FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify';
import { getLogger } from './logger/logger';
import { addDataRoute } from './mapping/DataRoutesMapping';
import { clientInteractionRoute } from './mapping/ClientInteractionRouteMapping';

const initServer = async (): Promise<FastifyInstance> => {
  const logger = getLogger();
  const swaggerEnabled: boolean = config.has('swagger.enabled') && config.get<boolean>('swagger.enabled');
  const afterCreated = async (server: FastifyInstance): Promise<void> => {
    await addDataRoute(server);
    await clientInteractionRoute(server);
  };
  const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply): FastifyReply => {
    logger.error(`Failed to execute request. Url=[${request.url}], body=[${JSON.stringify(request.body)})].`, error);
    if (error?.statusCode === 400) {
      return reply.status(400).send(error.message);
    }
    if (error?.statusCode === 401 || error?.statusCode === 403) {
      return reply.status(error.statusCode).send('Access Denied');
    }

    return reply.status(500).send('Failed to execute request.');
  };

  const serverOptions: FastifyServerOptions = {
    trustProxy: true,
    // AWS recommended that you configure the idle timeout of your application
    // to be larger than the idle timeout configured for the load balancer.
    keepAliveTimeout: 61_000
  };
  const server: FastifyInstance = fastify(serverOptions);
  server.log = logger;
  server.addHook('onResponse', (request: FastifyRequest, reply: FastifyReply) => {
    const time = reply.getResponseTime();
    logger.info(`Request: ${request.method} - ${request.url}. Response time: ${time}ms`);
  });

  server.setErrorHandler(errorHandler);

  if (swaggerEnabled) {
    server.register(fastifySwagger, {
      routePrefix: '/swagger',
      swagger: {
        info: {
          title: 'AI Bot API',
          description: 'API documentation for AI Bot',
          version: '1.0.0'
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here'
        },
        consumes: ['application/json'],
        produces: ['application/json']
      },
      exposeRoute: true
    });
  }

  // Register client interactive interaction socket
  server.register(websocket, {
    clientTracking: true
  });

  await afterCreated(server);
  return server;
};

export {
  initServer
};
