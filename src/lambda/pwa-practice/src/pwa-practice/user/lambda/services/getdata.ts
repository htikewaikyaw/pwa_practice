import { dbTableNames } from '../resources';
import { pool } from './db-connection';

export const getSingleQuery = (
  targetTable: string,
  inputKeyName: string,
  inputKey: string,
): { query: string } => {
  let queries: { query: string } = { query: '' };
  if (targetTable === dbTableNames.user) {
    const query = `
        SELECT * FROM "${targetTable}" WHERE "${inputKeyName}"='${inputKey}';
        `;
    queries = { query: query };
  }
  return queries;
};

export const getSingleData = async (inputKeyName: string, inputKey: string, table: string) => {
  const key = inputKey;
  const keyName = inputKeyName;
  const targetTable = table;
  /* database operation begion*/
  const dbClient = await pool.connect();
  try {
    const query = getSingleQuery(targetTable, keyName, key).query;
    console.info('redquery', query);
    const response = await pool.query(query);
    if (response.rows.length == 0) {
      return { operation: 'error', message: 'Not Found!' };
    }
    const resultInsert = response.rows[0];
    return { operation: 'success', data: resultInsert };
  } catch (e: any) {
    console.error('red result', e);
    if (e.code == '42703') {
      return { operation: 'error', message: e.routine };
    }
    return { operation: 'error', message: 'unknow error!' };
  } finally {
    dbClient.release();
    console.log('final database release on insert');
  }
};

export const getDataForTwoParameter = async (input: Object, table: string) => {
  /* database operation begion*/
  const key1 = Object.keys(input)[0];
  const value1 = input[key1 as keyof typeof input];
  const key2 = Object.keys(input)[1];
  const value2 = input[key2 as keyof typeof input];
  const dbClient = await pool.connect();
  try {
    const query = `SELECT * FROM "${table}" WHERE "${key1}"='${value1}' AND "${key2}"='${value2}';`;
    const response = await pool.query(query);
    console.info('2222222', response);
    if (response.rows.length == 0) {
      return { operation: 'error', message: 'Not Found!' };
    }
    const resultInsert = response.rows[0];
    return { operation: 'success', data: resultInsert };
  } catch (e: any) {
    console.error('red result', e);
    if (e.code == '42703') {
      return { operation: 'error', message: e.routine };
    }
    return { operation: 'error', message: 'unknow error!' };
  } finally {
    dbClient.release();
    console.log('final database release on insert');
  }
};
