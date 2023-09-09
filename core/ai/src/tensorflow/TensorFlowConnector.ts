/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import '@tensorflow/tfjs';

import config from 'config';
import { load, QuestionAndAnswer } from '@tensorflow-models/qna';

export class TensorFlowConnector {
  private static _instance: TensorFlowConnector = new TensorFlowConnector();

  static get instance(): TensorFlowConnector {
    return this._instance;
  }

  private readonly QnAModel: Promise<QuestionAndAnswer>;

  public async executeWithContext(requestContent: string) {
    try {
      const modelInstance = await load();

      const context = 'Nikola Tesla (/ˈtɛslə/;[2] Serbo-Croatian: [nǐkola têsla]; Serbian Cyrillic: Никола Тесла;[a] 10\n' +
        '      July 1856 – 7 January 1943) was a Serbian-American[4][5][6] inventor, electrical engineer, mechanical engineer,\n' +
        '      and futurist who is best known for his contributions to the design of the modern alternating current (AC)\n' +
        '      electricity supply system.[7] <br>\n' +
        '\n' +
        '      Born and raised in the Austrian Empire, Tesla studied engineering and physics in the 1870s without receiving a\n' +
        '      degree, and gained practical experience in the early 1880s working in telephony and at Continental Edison in the\n' +
        '      new electric power industry. He emigrated in 1884 to the United States, where he would become a naturalized\n' +
        '      citizen. He worked for a short time at the Edison Machine Works in New York City before he struck out on his own.\n' +
        '      With the help of partners to finance and market his ideas, Tesla set up laboratories and companies in New York to\n' +
        '      develop a range of electrical and mechanical devices. His alternating current (AC) induction motor and related\n' +
        '      polyphase AC patents, licensed by Westinghouse Electric in 1888, earned him a considerable amount of money and\n' +
        '      became the cornerstone of the polyphase system which that company would eventually market.<br>\n' +
        '\n' +
        '      Attempting to develop inventions he could patent and market, Tesla conducted a range of experiments with\n' +
        '      mechanical oscillators/generators, electrical discharge tubes, and early X-ray imaging. He also built a\n' +
        '      wireless-controlled boat, one of the first ever exhibited. Tesla became well known as an inventor and would\n' +
        '      demonstrate his achievements to celebrities and wealthy patrons at his lab, and was noted for his showmanship at\n' +
        '      public lectures. Throughout the 1890s, Tesla pursued his ideas for wireless lighting and worldwide wireless\n' +
        '      electric power distribution in his high-voltage, high-frequency power experiments in New York and Colorado\n' +
        '      Springs. In 1893, he made pronouncements on the possibility of wireless communication with his devices. Tesla\n' +
        '      tried to put these ideas to practical use in his unfinished Wardenclyffe Tower project, an intercontinental\n' +
        '      wireless communication and power transmitter, but ran out of funding before he could complete it.[8]<br>\n' +
        '\n' +
        '      After Wardenclyffe, Tesla experimented with a series of inventions in the 1910s and 1920s with varying degrees of\n' +
        '      success. Having spent most of his money, Tesla lived in a series of New York hotels, leaving behind unpaid bills.\n' +
        '      He died in New York City in January 1943.[9] Tesla\'s work fell into relative obscurity following his death, until\n' +
        '      1960, when the General Conference on Weights and Measures named the SI unit of magnetic flux density the tesla in\n' +
        '      his honor.[10] There has been a resurgence in popular interest in Tesla since the 1990s.[11]';
      const answers = await modelInstance.findAnswers(requestContent, context);

      console.log('RESPONSE: ', answers);

      return answers;
    } catch (err) {
      console.error(`Failed to analyze request with prompt: ${requestContent}`, err);
      throw err;
    }
  }

  private prepareContext(): string {
    try {
      const ticketsList = config.get('ai.tickets');
      const messages = ticketsList
        .map((ticket, index) => `${index+1}) Request titled as ${ticket.title}: ${ticket.description}.`)
        .join('\n');

      return `We have several workflows to propose to our users. Defaults workflow are the following:
      ${messages}
      Please in your response specify the title of chosen workflow if format like "Title: WORKFLOW_TITLE" if possible.
      If it's not possible to decide from the given variants, please respond like "Unable to recognize".`;
    } catch (err) {
      console.error(`Failed to prepare analyzing context.`, err);
      throw err;
    }
  }
}

export const tensorFlowConnector = TensorFlowConnector.instance;
