/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

declare global {
  interface StorageBounds {
    warningBound: number;
    dangerBound: number;
  }
  interface Window {
    REACT_APP_API_GATEWAY_URL: string;
    storageBounds: {
      domains: StorageBounds;
    }
  }
}

export default global;
