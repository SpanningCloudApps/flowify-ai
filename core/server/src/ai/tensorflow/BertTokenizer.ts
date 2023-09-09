import * as tf from '@tensorflow/tfjs';

const SEPERATOR = '\u2581';
export const UNK_INDEX = 100;
export const CLS_INDEX = 101;
export const CLS_TOKEN = '[CLS]';
export const SEP_INDEX = 102;
export const SEP_TOKEN = '[SEP]';
export const NFKC_TOKEN = 'NFKC';
export const VOCAB_BASE =
  'https://tfhub.dev/tensorflow/tfjs-model/mobilebert/1/';
export const VOCAB_URL = VOCAB_BASE + 'processed_vocab.json?tfjs-format=file';

const MAX_QUERY_LEN = 64;
const MAX_SEQ_LEN = 384;

class TrieNode {
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

class Trie {
  private root = new TrieNode(null);

  insert(word: string, score: number, index: number) {
    let node = this.root;

    const symbols = [];
    for (const symbol of word) {
      symbols.push(symbol);
    }

    for (let i = 0; i < symbols.length; i++) {
      if (node.children[symbols[i]] == null) {
        node.children[symbols[i]] = new TrieNode(symbols[i]);
        node.children[symbols[i]].parent = node;
      }

      node = node.children[symbols[i]];

      if (i === symbols.length - 1) {
        node.end = true;
        node.score = score;
        node.index = index;
      }
    }
  }

  find(token: string): TrieNode {
    let node = this.root;
    let iter = 0;

    while (iter < token.length && node != null) {
      node = node.children[token[iter]];
      iter++;
    }

    return node;
  }
}

function isWhitespace(ch: string): boolean {
  return /\s/.test(ch);
}

function isInvalid(ch: string): boolean {
  return (ch.charCodeAt(0) === 0 || ch.charCodeAt(0) === 0xfffd);
}

const punctuations = '[~`!@#$%^&*(){}[];:"\'<,.>?/\\|-_+=';

function isPunctuation(ch: string): boolean {
  return punctuations.indexOf(ch) !== -1;
}

export interface Token {
  text: string;
  index: number;
}

export class BertTokenizer {
  private vocab: string[];
  private trie: Trie;

  async load() {
    this.vocab = await this.loadVocab();

    this.trie = new Trie();
    for (let vocabIndex = 999; vocabIndex < this.vocab.length; vocabIndex++) {
      const word = this.vocab[vocabIndex];
      this.trie.insert(word, 1, vocabIndex);
    }
  }

  private async loadVocab(): Promise<[]> {
    return tf.util.fetch(VOCAB_URL).then(d => d.json());
  }

  processInput(text: string): Token[] {
    const charOriginalIndex: number[] = [];
    const cleanedText = this.cleanText(text, charOriginalIndex);
    const origTokens = cleanedText.split(' ');

    let charCount = 0;
    const tokens = origTokens.map((token) => {
      token = token.toLowerCase();
      const tokens = this.runSplitOnPunc(token, charCount, charOriginalIndex);
      charCount += token.length + 1;
      return tokens;
    });

    let flattenTokens: Token[] = [];
    for (let index = 0; index < tokens.length; index++) {
      flattenTokens = flattenTokens.concat(tokens[index]);
    }
    return flattenTokens;
  }

  private cleanText(text: string, charOriginalIndex: number[]): string {
    const stringBuilder: string[] = [];
    let originalCharIndex = 0, newCharIndex = 0;
    for (const ch of text) {
      if (isInvalid(ch)) {
        originalCharIndex += ch.length;
        continue;
      }
      if (isWhitespace(ch)) {
        if (stringBuilder.length > 0 &&
          stringBuilder[stringBuilder.length - 1] !== ' ') {
          stringBuilder.push(' ');
          charOriginalIndex[newCharIndex] = originalCharIndex;
          originalCharIndex += ch.length;
        } else {
          originalCharIndex += ch.length;
          continue;
        }
      } else {
        stringBuilder.push(ch);
        charOriginalIndex[newCharIndex] = originalCharIndex;
        originalCharIndex += ch.length;
      }
      newCharIndex++;
    }
    return stringBuilder.join('');
  }

  private runSplitOnPunc(
    text: string, count: number,
    charOriginalIndex: number[]): Token[] {
    const tokens: Token[] = [];
    let startNewWord = true;
    for (const ch of text) {
      if (isPunctuation(ch)) {
        tokens.push({text: ch, index: charOriginalIndex[count]});
        count += ch.length;
        startNewWord = true;
      } else {
        if (startNewWord) {
          tokens.push({text: '', index: charOriginalIndex[count]});
          startNewWord = false;
        }
        tokens[tokens.length - 1].text += ch;
        count += ch.length;
      }
    }
    return tokens;
  }

  tokenize(text: string): number[] {
    let outputTokens: number[] = [];

    const words = this.processInput(text);
    words.forEach(word => {
      if (word.text !== CLS_TOKEN && word.text !== SEP_TOKEN) {
        word.text = `${SEPERATOR}${word.text.normalize(NFKC_TOKEN)}`;
      }
    });

    for (let i = 0; i < words.length; i++) {
      const chars = [];
      for (const symbol of words[i].text) {
        chars.push(symbol);
      }

      let isUnknown = false;
      let start = 0;
      const subTokens: number[] = [];

      const charsLength = chars.length;

      while (start < charsLength) {
        let end = charsLength;
        let currIndex;

        while (start < end) {
          const substr = chars.slice(start, end).join('');

          const match = this.trie.find(substr);
          if (match != null && match.end != null) {
            currIndex = match.getWord()[2];
            break;
          }

          end = end - 1;
        }

        if (currIndex == null) {
          isUnknown = true;
          break;
        }

        subTokens.push(currIndex);
        start = end;
      }

      if (isUnknown) {
        outputTokens.push(UNK_INDEX);
      } else {
        outputTokens = outputTokens.concat(subTokens);
      }
    }

    return outputTokens;
  }

  public processTokenization(
    query: string,
    context: string,
    maxQueryLen: number = MAX_QUERY_LEN,
    maxSeqLen: number = MAX_SEQ_LEN,
    docStride = 128
  ) {
    const queryTokens = this.tokenize(query);

    const origTokens = this.processInput(context.trim());
    const tokenToOrigIndex: number[] = [];
    const allDocTokens: number[] = [];
    for (let i = 0; i < origTokens.length; i++) {
      const token = origTokens[i].text;
      const subTokens = this.tokenize(token);
      for (let j = 0; j < subTokens.length; j++) {
        const subToken = subTokens[j];
        tokenToOrigIndex.push(i);
        allDocTokens.push(subToken);
      }
    }
    const maxContextLen = maxSeqLen - queryTokens.length - 3;

    const docSpans: { start: number, length: number }[] = [];
    let startOffset = 0;
    while (startOffset < allDocTokens.length) {
      let length = allDocTokens.length - startOffset;
      if (length > maxContextLen) {
        length = maxContextLen;
      }
      docSpans.push({start: startOffset, length});
      if (startOffset + length === allDocTokens.length) {
        break;
      }
      startOffset += Math.min(length, docStride);
    }

    const features = docSpans.map(docSpan => {
      const tokens = [];
      const segmentIds = [];
      const tokenToOrigMap: { [index: number]: number } = {};
      tokens.push(CLS_INDEX);
      segmentIds.push(0);
      for (let i = 0; i < queryTokens.length; i++) {
        const queryToken = queryTokens[i];
        tokens.push(queryToken);
        segmentIds.push(0);
      }
      tokens.push(SEP_INDEX);
      segmentIds.push(0);
      for (let i = 0; i < docSpan.length; i++) {
        const splitTokenIndex = i + docSpan.start;
        const docToken = allDocTokens[splitTokenIndex];
        tokens.push(docToken);
        segmentIds.push(1);
        tokenToOrigMap[tokens.length] = tokenToOrigIndex[splitTokenIndex];
      }
      tokens.push(SEP_INDEX);
      segmentIds.push(1);
      const inputIds = tokens;
      const inputMask = inputIds.map(id => 1);
      while ((inputIds.length < maxSeqLen)) {
        inputIds.push(0);
        inputMask.push(0);
        segmentIds.push(0);
      }
      return {inputIds, inputMask, segmentIds, origTokens, tokenToOrigMap};
    });

    const inputIdArray = features.map(f => f.inputIds);
    const segmentIdArray = features.map(f => f.segmentIds);
    const inputMaskArray = features.map(f => f.inputMask);

    const globalStep = tf.scalar(1, 'int32');
    const batchSize = features.length;
    return tf.tidy(() => {
      const inputIds =
        tf.tensor2d(inputIdArray, [batchSize, MAX_SEQ_LEN], 'int32');
      const segmentIds =
        tf.tensor2d(segmentIdArray, [batchSize, MAX_SEQ_LEN], 'int32');
      const inputMask =
        tf.tensor2d(inputMaskArray, [batchSize, MAX_SEQ_LEN], 'int32');
      return {
        input_ids: inputIds,
        segment_ids: segmentIds,
        input_mask: inputMask,
        global_step: globalStep
      }
    });
  }

  public async getValidationTensor(query: string, context: string,) {
    const inputTensors = this.processTokenization(query, context);

    const model = await tf.loadGraphModel('https://tfhub.dev/tensorflow/tfjs-model/mobilebert/1');

    const result model.execute(inputTensors, ['start_log_tensors', 'end_log_tensors']);
  }
}

export async function loadTokenizer(): Promise<BertTokenizer> {
  const tokenizer = new BertTokenizer();
  await tokenizer.load();
  return tokenizer;
}
