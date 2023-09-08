/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { FastifyInstance } from 'fastify/types/instance';
import { openAIConnector } from 'openai/OpenAIConnector';

const addOpenAiRoutes = (server: FastifyInstance) => {
  server.get(
    '/test',
    async (_req, res) => {
      const result = await openAIConnector.execute();

      res.send({ execution: result })
    }
  );
};

export {
  addOpenAiRoutes
};
