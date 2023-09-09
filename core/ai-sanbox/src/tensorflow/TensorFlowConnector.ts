/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import '@tensorflow/tfjs';

import config from 'config';
import { load } from '@tensorflow-models/qna';
import { TensorFlowResponse } from 'model/AIConnector';

export class TensorFlowConnector {
  private static _instance: TensorFlowConnector = new TensorFlowConnector();

  static get instance(): TensorFlowConnector {
    return this._instance;
  }

  public async executeWithContext(requests: (string | null)[]): Promise<TensorFlowResponse[]> {
    try {
      const modelInstance = await load();

      const context = this.prepareContext();

      const prompts = requests.filter(request => !!request) as string[];
      const answersList: TensorFlowResponse[][] = await Promise.all(prompts.map(request => modelInstance.findAnswers(request, context)));

      return answersList.filter(answer => answer.length).flat();
    } catch (err) {
      console.error(`Failed to analyze request with prompt: ${requests[0]}`, err);
      throw err;
    }
  }

  private prepareContext(): string {
    try {
      const ticketsList = config.get('ai.tickets');
      const messages = ticketsList
        .map((ticket, index) => `${index+1}) Request titled as ${ticket.title}: ${ticket.description}.`)
        .join('\n');

      return `  Requester can easily go through the different specified workflows:
      In case we have new user in our system, user onboarded or newcomer, requester should go through specified $ADD_USER$ workflow. And in case user is registered - requester should go through $ADD_USER$ workflow. In situation user is newcomer - requester should go through $ADD_USER$ workflow.
      In case we to drop user of our system, requester should go through specified $REMOVE_USER$ workflow. And in case user offboarded or is offboarding, requester should go through $REMOVE_USER$. In situation user removed from the system, requester should go through $REMOVE_USER$ workflow.
      In case where requester has lost his credentials, requester should go through specified $RESET_PASSWORD$ workflow. And in case of lost device or password, requester should go through $RESET_PASSWORD$ workflow. In situation requester or someone wants to change his password, requester should go through $RESET_PASSWORD$ workflow. Every time when we're talking about password or credentials, requester should go through specified $RESET_PASSWORD$ workflow.
      In case of situation where some application downtime or even application unavailability, requester should go through specified $APP_DOWNTIME$ workflow. In situation where application downtime, performance or general unavailability, requester should go through $APP_DOWNTIME$ workflow.
      In case of reports about slow internet, connectivity issues, network throttling, requester should go through specified $SLOW_INTERNET$ workflow. And in situation of network connectivity issues, internet speed or general network unavailability, requester should go through $SLOW_INTERNET$ workflow.
      Additional cases:
      For new users who have recently joined our system or newcomers, the requester should go through designated $ADD_USER$ workflow. Even if the user is already registered, the requester should go through $ADD_USER$ workflow. In the event of a user being a newcomer, the requester should go through $ADD_USER$ workflow.
      When the need arises to remove a user from our system, the requester should go through $REMOVE_USER$ workflow. Whether the user is offboarding or has already completed offboarding, the requester should go through $REMOVE_USER$ workflow. If the user has been successfully removed from the system, the requester should go through $REMOVE_USER$ workflow.
      In cases where the requester has misplaced their credentials, requester should go through $RESET_PASSWORD$ workflow. Whether it's due to a lost device or forgotten password, the requester should go through $RESET_PASSWORD$ workflow. Even when a requester or any user wishes to change their password, requester should go through $RESET_PASSWORD$ workflow. Whenever password or credentials-related matters are discussed, the requester should go through $RESET_PASSWORD$ workflow.
      When faced with instances of application downtime or unavailability, the requester should go through $APP_DOWNTIME$ workflow. Whether it's a situation involving application downtime, performance issues, or general unavailability, the requester should go through $APP_DOWNTIME$ workflow.
      If there are reports of low disk space on a device, the requester should go through $LOW_DISK_SPACE$ workflow. This workflow is essential to address the detected low disk space.
      To assign the user an appropriate M365 license, the requester should go through $ASSIGN_M365$ workflow. This ensures that users receive the necessary Microsoft 365 licenses.
      When it's necessary to grant user access to all relevant client portals, the requester should go through $GRANT_ACCESS$ workflow. This workflow streamlines the process of providing users with access to client portals.
      In cases of slow internet, connectivity issues, or network throttling, the requester should go through $SLOW_INTERNET$ workflow. This workflow $SLOW_INTERNET$ is specifically designed to address issues related to network connectivity, internet speed, or general network unavailability.
      Additional workflow info:
      ${messages}`;
    } catch (err) {
      console.error(`Failed to prepare analyzing context.`, err);
      throw err;
    }
  }
}

export const tensorFlowConnector = TensorFlowConnector.instance;
