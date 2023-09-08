import { FastifyInstance } from 'fastify';
import { AiApiRoute } from '../route/AiApiRoute';

const addApiRoutes = async (server: FastifyInstance): Promise<void> => {
  await server.register((app, _, done) => {
    app.get(
      '/',
      AiApiRoute.get
    );
    done();
  }, { prefix: 'ecosystem/api' });
};

export {
  addApiRoutes
};
