import config from 'config';
import { initServer } from './server';
import { createLogger } from './logger/logger';
import { queueService } from './service/workflow/QueueService';
import { classificationProcessorService } from './service/workflow/ClassificationProcessorService';

const logger = createLogger('core-api');

const start = async (): Promise<void> => {
  const port: number = config.get<number>('server.ports.http');
  const host: string = config.get<string>('server.host');

  try {
    const server = await initServer();
    classificationProcessorService.infinityPoll();
    await server.listen({ port, host });
    logger.info(`Server had been started on port ${port}`);
  } catch (e) {
    logger.error(`Failed to start server on port ${port}.`, e);
  }
};

start();

