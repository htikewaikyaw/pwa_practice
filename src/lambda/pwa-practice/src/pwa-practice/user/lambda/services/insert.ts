import { dbTableNames } from '../resources';
import { pool, database } from './db-connection';

export const insertQuery = (targetTable: string): { query: string } => {
  let queries: { query: string } = { query: '' };
  if (targetTable === dbTableNames.user) {
    const query = `
        INSERT INTO "${targetTable}" (
        name,
        email,
        "emailVerified",
        image,
        "createdAt",
        "updatedAt",
        password,
        "roleId",
        "departmentId"
        )
        VALUES ($1,$2,NOW(),NULL,NOW(),NOW(),$3,$4,$5) 
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
    // const sortedData = sortedObjectBasedOnKey(data);
    const values = Object.values(data);
    // console.info('query', query);
    // console.info('val', values);
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

export const updateFunction = async (id: string, inputData: Object, table: string) => {
  const data = inputData;
  const targetTable = table;
  /* database operation begion*/
  const dbClient = await pool.connect();
  try {
    const query = `
    UPDATE "${targetTable}" 
    SET       
      name = $2,
      email = $3,     
      "emailVerified" = $4,
      image = $5,
      "createdAt" = $6,
      "updatedAt" = $7,   
      password = $8,  
      "roleId" = $9,
      "departmentId" = $10
    WHERE id = $1
      RETURNING *    
    ;
    `;
    const values = Object.values(data);
    // console.info('query', query);
    // console.info('val', values);
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

export const deleteFunction = async (id: string, table: string) => {
  const targetTable = table;
  /* database operation begion*/
  const dbClient = await pool.connect();
  try {
    const query = `
      DELETE FROM "${targetTable}" 
      WHERE id = '${id}'
      RETURNING *      
    `;

    // console.info('query', query);
    // console.info('val', values);
    const response = await pool.query(query);
    const result = response.rows[0];
    return { operation: 'success', data: result };
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
