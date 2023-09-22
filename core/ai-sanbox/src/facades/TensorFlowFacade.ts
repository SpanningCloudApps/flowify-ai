/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { TicketDto } from 'dto/Ticket';
import { tensorFlowConnector } from 'tensorflow/TensorFlowConnector';
import { workflowEncodeMap } from 'tensorflow/model/TerratriceModel';
import { AIFacade, CategorizationResult } from 'model/AIFacade';

class TensorFlowFacade implements AIFacade {
  private static _instance: TensorFlowFacade = new TensorFlowFacade();

  static get instance() {
    return this._instance;
  }

  public async categorize(ticket: TicketDto): Promise<CategorizationResult> {
    const responses = await tensorFlowConnector.executeWithContext(ticket.description);
    return this.parseResponses(responses);
  }

  private parseResponses(responses: number[]): CategorizationResult {
    if (responses.length === 0) {
      return {
        workflowName: null,
        probability: 100,
        allClassifications: []
      }
    }

    const probability = Math.max(...responses);
    const workflowIndex = Number(responses.indexOf(probability));
    let recognizedWorkflow;
    let allClassifications = [];

    responses.forEach((probability, index) => {
      for (const [workflowNaming, code] of Object.entries(workflowEncodeMap)) {
        if (code[workflowIndex] === 1) {
          recognizedWorkflow = workflowNaming;
        } else if (code[index] === 1) {
          allClassifications.push({ probability: probability * 100, workflowName: workflowNaming });
        }
      }
    });

    return {
      workflowName: recognizedWorkflow,
      probability: probability * 100,
      allClassifications
    }
  }
}

export const tensorFlowFacade = TensorFlowFacade.instance;
