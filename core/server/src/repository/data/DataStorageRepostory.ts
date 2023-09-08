import config from 'config';

import { getLogger } from '../../logger/logger';
import { Database } from '../Database';
import { sql } from 'slonik';

const logger = getLogger();

export class DataStorageRepostory {
  private static _instance = new DataStorageRepostory();

  private readonly tableName: string = '';
  private readonly pgConnectionUri: string = '';

  constructor() {
    if (config.has('sql.indexdb')) {
      const dbConfig: {
        db: string;
        host: string;
        port: number;
        user: string;
        pass: string;
      } = config.get('sql.indexdb');
      this.pgConnectionUri = `postgres://${dbConfig.user}:${dbConfig.pass}@${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;
      logger.info(`Connection URI to database built successfully. Connection URI: ${this.pgConnectionUri}`);
    } else {
      logger.error('Error during Trigger service set up: no DB config specified!');
    }
    this.tableName = 'classification_result';
  }

  static get instance(): DataStorageRepostory {
    return this._instance;
  }

  // public async save(data: Record<string, unknown>) {
  //
  //   const connection = Database.ofConnection(this.pgConnectionUri).connect();
  //   const result = await connection.query(query.text, query.values);
  //   return result?.rows[0] || null;
  // }
}

export const dataStorageService = DataStorageRepostory.instance;
