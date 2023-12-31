import config from 'config';
import { initServer } from './server';
import { createLogger } from './logger/logger';
import { classificationProcessorService } from './service/workflow/ClassificationProcessorService';

const logger = createLogger('core-api');

const start = async (): Promise<void> => {
  const port: number = config.get<number>('server.ports.http');
  const host: string = config.get<string>('server.host');

  try {
    const server = await initServer();
    await server.listen({ port, host });
    logger.info(`Server had been started on port ${port}`);
  } catch (e) {
    logger.error(`Failed to start server on port ${port}.`, e);
  }
};

try {
  classificationProcessorService.poll();
} catch (err) {
  logger.error('Error occurred during common queue poll', err);
}


start();

