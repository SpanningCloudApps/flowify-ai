/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { FastifyInstance } from 'fastify/types/instance';
import { FastifyRequest } from 'fastify/types/request';
import { openAIFacade } from 'facades/OpenAIFacade';
import { OpenAIRequestBody } from 'dto/RequestDto';

const addOpenAiRoutes = (server: FastifyInstance) => {
  server.register((app, _, done) => {
    app.post(
      '/test',
      async (req: FastifyRequest, res) => {
        const { ticket } = (req.body as OpenAIRequestBody);

        try {
          const result = await openAIFacade.categorize(ticket);

          res.send(result);
        } catch (err) {
          console.error('Request to /ai/test failed', err);
          res.status(500).send({ errorMessage: err.message });
        }
      }
    );

    done();
  }, { prefix: 'ai' })
};

export {
  addOpenAiRoutes
};
