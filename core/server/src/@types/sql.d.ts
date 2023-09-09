declare module 'sql' {
  import {
    Column as WrongColumn,
    ModifyingQuery as WrongModifyingQuery,
    Query as WrongQuery,
    Queryable as WrongQueryable,
    SubQuery as WrongSubQuery
  } from 'sql';

  export interface Queryable<T> extends WrongQueryable {
    and(nodes: any[] | any);

    subQuery(name: string): SubQuery<T>;
  }

  export interface Column<Name, T> extends WrongColumn<Name, T> {
    key(key: string);

    keyText(key: string);

    between(start: any, end: any);

    plus(increment: number);
  }

  export interface Query<T> extends WrongQuery {
    from(statement: any): Query<T>;
  }

  export interface ModifyingQuery extends WrongModifyingQuery {
    and(nodes: any[]);

    and(nodes: any);
  }

  export interface SubQuery<T> extends WrongSubQuery<T> {
    and(nodes: any[] | any);
  }
}
