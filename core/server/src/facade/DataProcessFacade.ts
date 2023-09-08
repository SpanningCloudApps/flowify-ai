/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { DataProcessBodyDto } from '../dto/DataDto';
import { getLogger } from '../logger/logger';

const logger = getLogger();

export class DataProcessFacade {
  private static _instance = new DataProcessFacade();

  static get instance(): DataProcessFacade {
    return this._instance;
  }

  public async process(body: DataProcessBodyDto) {
    logger.info(`Data to process: ${JSON.stringify(body)}`);
  }

}

export const dataProcessFacade = DataProcessFacade.instance;
