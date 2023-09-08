/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */

/**
 * Simple debounce.
 * @param fn - function
 * @param ms - ms
 * @returns debounced function
 */
function simpleDebounce<T extends (...rest: unknown[]) => void>(fn: T, ms = 1000): (...rest: unknown[]) => void {
  let tid: NodeJS.Timeout;

  return (...args: unknown[]): void => {
    clearTimeout(tid);

    tid = setTimeout(
      (...args) => {
        fn(...args);
      },
      ms,
      ...args,
    );
  };
}

export default simpleDebounce;
