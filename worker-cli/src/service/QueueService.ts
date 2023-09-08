/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

export default class QueueService {

  public async subscribeToWorkflows() {
    console.log(`Subscribed to workflows`);
  }

  public async publishWorkflowResult(data: any) {
    console.log(`Publish message to the queue ${JSON.stringify(data)}`);
  }

  public async subscribeToStepResults() {
    console.log(`Subscribed to step results`);
  }

  public async publishStepDataRequest(data: any) {
    console.log(`Publish message to the queue ${JSON.stringify(data)}`);
  }

}
