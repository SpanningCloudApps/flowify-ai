import { FastifyInstance } from 'fastify/types/instance';
import { FastifyRequest } from 'fastify/types/request';
import { openAIFacade } from 'facades/OpenAIFacade';
import { tensorFlowFacade } from 'facades/TensorFlowFacade';
import { OpenAIRequestBody, ReinforcementRequestBody } from 'dto/RequestDto';
import { aiContext } from 'context/AIContext';

const addOpenAiRoutes = (server: FastifyInstance) => {
  server.register((app, _, done) => {
    app.post(
      '/test',
      async (req: FastifyRequest, res) => {
        const { ticket } = (req.body as OpenAIRequestBody);

        try {
          aiContext.setAIStrategy(openAIFacade);
          const result = await aiContext.categorize(ticket);

          res.send(result);
        } catch (err) {
          console.error('Request to /ai/test failed', err);
          res.status(500).send({ errorMessage: err.message });
        }
      }
    );

    app.post(
      '/learn',
      async (req: FastifyRequest, res) => {
        const { prompt } = (req.body as ReinforcementRequestBody);

        try {
          await openAIFacade.reinforcementLearn(prompt);

          res.status(204);
        } catch (err) {
          console.error('Request to /ai/learn failed', err);
          res.status(500).send({ errorMessage: err.message });
        }
      }
    );

    app.post(
      '/tensorflow',
      async (req: FastifyRequest, res) => {
        const { ticket } = (req.body as OpenAIRequestBody);
        try {
          aiContext.setAIStrategy(tensorFlowFacade);
          const result = await aiContext.categorize(ticket);

          res.send(result);
        } catch (err) {
          console.error('Request to /ai/tensorflow failed', err);
          res.status(500).send({ errorMessage: err.message });
        }
      }
    )

    done();
  }, { prefix: 'ai' })
};

export {
  addOpenAiRoutes
};
