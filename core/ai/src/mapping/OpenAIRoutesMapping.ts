/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { FastifyInstance } from 'fastify/types/instance';
import { FastifyRequest } from 'fastify/types/request';
import { openAIConnector } from 'openai/OpenAIConnector';
import { OpenAIRequestBody } from 'dto/RequestDto';

const addOpenAiRoutes = (server: FastifyInstance) => {
  server.register((app, _, done) => {
    app.post(
      '/test',
      async (req: FastifyRequest, res) => {
        const request: string = (req.body as OpenAIRequestBody).message;

        try {
          const result = await openAIConnector.execute(request);

          res.send({ execution: result });
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
