/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import QueueService from '../service/QueueService';

export default class WorkflowFacade {

  private readonly queueService: QueueService;

  constructor(queueService: QueueService) {
    this.queueService = queueService;
  }

  public async startWorkflow(message: any) {

  }

  public async handleStepResultReceived(message: any) {

  }

}
