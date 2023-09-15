/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

export class TrieNode {
  parent: TrieNode;
  children: { [key: string]: TrieNode } = {};
  end = false;
  score: number;
  index: number;
  constructor(private key: string) {}

  getWord(): [string[], number, number] {
    const output: string[] = [];
    let node: TrieNode = this;

    while (node != null) {
      if (node.key != null) {
        output.unshift(node.key);
      }
      node = node.parent;
    }

    return [output, this.score, this.index];
  }
}
