/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { Data } from './model/Data';
import { CategorizationResult } from './model/Data';

export interface Connector {
  categorize: (data: Data) => Promise<CategorizationResult>;
}
