/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

import React, { Component, ReactNode } from 'react';
import { DefaultFallback } from './components/DefaultFallback';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <DefaultFallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
