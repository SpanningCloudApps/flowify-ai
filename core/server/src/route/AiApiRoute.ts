import { getLogger } from '../logger/logger';
import { FastifyReply, FastifyRequest } from 'fastify';

const logger = getLogger();

export class AiApiRoute {
  public static get(
    req: FastifyRequest,
    res: FastifyReply
  ): FastifyReply {
    try {
      return res.send('TEST');
    } catch (err) {
      const message = `TEST FAIL`;
      logger.error(message, err);
      return res.status(500).send({ message });
    }
  }
}
