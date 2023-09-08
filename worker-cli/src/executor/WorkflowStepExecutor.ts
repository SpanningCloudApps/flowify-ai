/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { StepType } from '../enum/StepType';
import StepExecutor from './StepExecutor';

export default class WorkflowStepExecutor {

  public getExecutor(stepType: StepType): StepExecutor {
    return {
      execute: async (message: any) => {
        return false;
      }
    };
  }

}
