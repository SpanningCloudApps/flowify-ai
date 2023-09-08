/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import config from 'config';
import { initServer } from 'server';

const start = async (): Promise<void> => {
  const port: number = config.get<number>('ai.server.port');
  const host: string = config.get<string>('ai.server.host');

  try {
    const server = await initServer();
    await server.listen({ port, host });
    console.log(`Server had been started on port ${port}`);
  } catch (e) {
    console.error(`Failed to start server on port ${port}.`, e);
  }
};

start();
