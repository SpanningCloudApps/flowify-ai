import { FastifyInstance } from 'fastify';
import { DataProcessRoute } from '../route/DataProcessRoute';

const addDataRoute = async (server: FastifyInstance): Promise<void> => {
  await server.register((app, _, done) => {
    app.post(
      '',
      {
        schema: {
          description: 'Push data to AI workflow',
          body: {
            type: 'object',
            required: ['createdBy', 'title', 'description'],
            properties: {
              createdBy: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              additionalInfo: {
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      DataProcessRoute.process
    );
    done();
  }, { prefix: 'ecosystem/api/data' });
};

export {
  addDataRoute
};
