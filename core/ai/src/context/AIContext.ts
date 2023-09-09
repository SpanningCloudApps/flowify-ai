/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { TicketDto } from 'dto/Ticket';
import { AIFacade, CategorizationResult } from 'model/AIFacade';

class AIContext {
  private static _instance = new AIContext();

  static get instance() {
    return this._instance;
  }

  private aiStrategy: AIFacade;

  public setAIStrategy(strategy: AIFacade): void {
    this.aiStrategy = strategy;
  }

  public async categorize(ticket: TicketDto): Promise<CategorizationResult> {
    return await this.aiStrategy.categorize(ticket);
  }
}

export const aiContext = AIContext.instance;
