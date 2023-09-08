import { Pool } from 'pg';

export interface DatabaseOptions {
  readonly user: string;
  readonly password: string;
  readonly host: string;
  readonly port: number;
  readonly database: string;
}

export class Database {

  private static readonly POOLS: Record<string, Database> = {};
  private readonly connectionString: string;

  private pool: Pool | undefined;

  private constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  static of(options: DatabaseOptions): Database {
    return Database.ofConnection(
      `postgres://${options.user}:${options.password}@${options.host}:${options.port}/${options.database}`);
  }

  static ofConnection(connectionString: string): Database {
    const database = Database.POOLS[connectionString];

    if (database) {
      return database;
    }

    const newDatabase = new Database(connectionString);
    Database.POOLS[connectionString] = newDatabase;
    return newDatabase;
  }

  connect(): Database {
    if (!this.pool) {
      const connectionString = this.connectionString;
      this.pool = new Pool({ connectionString });
    }

    return this;
  }

  async query(sql: string, values: string[] | number[] | boolean[]): Promise<{ rows: any[], rowCount: number }> {
    if (!this.pool) {
      throw new Error('PG client is not defined. Call register() method.');
    }

    let client;
    try {
      client = await this.pool.connect();
      const { rows, rowCount } = await client.query(sql, values);
      client.release();
      // Note: avoid doing expensive computation here, this will block releasing the client
      return { rows, rowCount };
    } catch (e) {
      if (client) {
        try {
          await client.release(e as Error);
        } catch (e) {
          // connection might be already released
        }
      }
      throw e;
    }
  }
}
