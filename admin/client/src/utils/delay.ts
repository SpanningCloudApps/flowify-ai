/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */
export default (ms = 100): Promise<undefined> => new Promise(resolve => setTimeout(resolve, ms));
