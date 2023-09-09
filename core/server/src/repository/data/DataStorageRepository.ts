import config from 'config';

import { getLogger } from '../../logger/logger';
import moment from 'moment';
import { Classification, ClassificationRow } from '../model/Classification';
import { Database } from '../Database';

const logger = getLogger();

export class DataStorageRepository {
  private static _instance = new DataStorageRepository();

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
  }

  static get instance(): DataStorageRepository {
    return this._instance;
  }

  public async save(params: {
    input: Record<string, unknown>;
    workflow_name: string;
    probability: number;
    data: Record<string, unknown>;
  }) {
    const currentTimestamp: moment.Moment = moment.utc();
    const insertParams: ClassificationRow = {
      input: params.input,
      workflow_name: params.workflow_name,
      probability: params.probability,
      data: params.data,
      created_at: currentTimestamp
    };

    const query = Classification.insert(insertParams).toQuery();
    const connection = Database.ofConnection(this.pgConnectionUri).connect();
    await connection.query(query.text, query.values);
  }
}

export const dataStorageRepository = DataStorageRepository.instance;
