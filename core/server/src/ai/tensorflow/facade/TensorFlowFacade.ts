import { tensorFlowConnector } from '../TensorFlowConnector';
import { TensorFlowResponse } from '../../model/AIConnector';
import { AIFacade, CategorizationResult, Data } from '../../model/AIFacade';

class TensorFlowFacade implements AIFacade {
  private static _instance: TensorFlowFacade = new TensorFlowFacade();

  static get instance() {
    return this._instance;
  }

  public async categorize(data: Data): Promise<CategorizationResult> {
    const firstTicketPrompt = `Through what workflow should requester go if: ${data.title}?`;
    const secondTicketPrompt = `Through what workflow should requester go if: ${data.description}`;
    const thirdTicketPrompt = data.additionalInfo ?
      `Through what workflow should requester go if: ${data.additionalInfo.join(', ')}` : null;

    const responses = await tensorFlowConnector.executeWithContext([firstTicketPrompt, secondTicketPrompt, thirdTicketPrompt]);
    return this.parseResponses(responses);
  }

  private parseResponses(responses: TensorFlowResponse[]): CategorizationResult {
    if (responses.length === 0) {
      return {
        workflowName: null,
        probability: 100,
        allClassifications: []
      };
    }
    const parsedResponses = responses.map(response => ({
      workflowName: response.text.split('$')[1],
      score: response.score
    }));

    let estimatedValue = 0;
    const responseMap = {};

    parsedResponses.forEach(response => {
      estimatedValue += response.score;
      if (responseMap.hasOwnProperty(response.workflowName)) {
        responseMap[response.workflowName] += response.score;
      } else {
        responseMap[response.workflowName] = response.score;
      }
    });

    const recognizedWorkflow = Object.keys(responseMap)
      .find(key => responseMap[key] === Math.max(...Object.values(responseMap))) as string;

    let allClassifications = [];

    for (const workflowName in responseMap) {
      if (workflowName !== recognizedWorkflow) {
        allClassifications.push({ workflowName, probability: responseMap[workflowName] / estimatedValue });
      }
    }

    return {
      workflowName: recognizedWorkflow,
      probability: (responseMap[recognizedWorkflow] / estimatedValue) * 100,
      allClassifications
    };
  }
}

export const tensorFlowFacade = TensorFlowFacade.instance;
