/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

export default interface StepExecutor {
  execute(message: any): Promise<boolean>;
}
