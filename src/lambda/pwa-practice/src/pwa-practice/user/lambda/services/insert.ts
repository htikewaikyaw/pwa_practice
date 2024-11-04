import { dbTableNames } from '../resources';
import { pool } from './db-connection';

export const insertQuery = (targetTable: string): { query: string } => {
  let queries: { query: string } = { query: '' };
  if (targetTable === dbTableNames.user) {
    const query = `
        INSERT INTO "${targetTable}" (
        email,
        filename,
        password,
        username
        )
        VALUES ($1,$2,$3,$4) 
        RETURNING *;
        `;
    queries = { query: query };
  }
  return queries;
};

export const insertFunction = async (inputData: Object, table: string) => {
  const data = inputData;
  const targetTable = table;
  /* database operation begion*/
  const dbClient = await pool.connect();
  try {
    const query = insertQuery(table).query;
    const sortedData = sortedObjectBasedOnKey(data);
    const values = Object.values(sortedData);
    console.info('query', query);
    console.info('val', values);
    const response = await pool.query(query, values);
    const resultInsert = response.rows[0];
    return { operation: 'success', data: resultInsert };
  } catch (e: any) {
    console.error('error', e);
    if (e.code == '23505') {
      return { operation: 'error', message: 'unique constrain error!' };
    }
    return { operation: 'error', message: 'unknow error!' };
  } finally {
    dbClient.release();
    console.log('final database release on insert');
  }
};

const sortedObjectBasedOnKey = (obj: { [key: string]: any }): { [key: string]: any } => {
  const sortedKeys = Object.keys(obj).sort();
  console.info('keyb', sortedKeys);
  const sortedObject: { [key: string]: any } = {};
  for (const key of sortedKeys) {
    sortedObject[key] = obj[key];
  }
  return sortedObject;
};
