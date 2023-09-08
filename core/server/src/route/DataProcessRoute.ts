import { getLogger } from '../logger/logger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DataProcessBodyDto } from '../dto/DataDto';
import { dataProcessFacade } from '../facade/DataProcessFacade';

const logger = getLogger();

export class DataProcessRoute {
  public static async process(
    req: FastifyRequest<{ Body: DataProcessBodyDto }>,
    res: FastifyReply
  ): FastifyReply {
    try {
      await dataProcessFacade.process(req.body);
      return res.status(204).send('done');
    } catch (err) {
      const message = `Failed data process: ${req.body}`;
      logger.error(message, err);
      return res.status(500).send({ message });
    }
  }
}
