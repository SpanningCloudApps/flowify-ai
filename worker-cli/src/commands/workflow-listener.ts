/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { Command } from '@oclif/core';
import QueueService from '../service/QueueService';

export default class WorkflowListenerCommand extends Command {
  static description = 'Listen to workflow execution';

  async run(): Promise<void> {
    const { args, flags } = await this.parse(WorkflowListenerCommand);

    const queueService = new QueueService();
    await queueService.initialize_queues();

    queueService.subscribeToWorkflows();
    queueService.subscribeToStepResults();
  }
}
