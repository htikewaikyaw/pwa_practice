import { Handler, APIGatewayEvent } from 'aws-lambda';
import { apiRequests, apiPaths, dbTableNames } from './resources';
import { insertFunction, updateFunction, deleteFunction } from './services/insert';
import { getDataForTwoParameter, getSingleData, getUserData } from './services/getdata';
import { getRole } from './services/getdata';
import { getDepartment } from './services/getdata';

export const handler: Handler = async (event: APIGatewayEvent) => {
  const requestMetod = event.httpMethod;
  const requestPath = event.path;
  //user test
  if (requestMetod === apiRequests.get && requestPath === apiPaths.user_api_test) {
    return buildResponse(200, { message: 'success', data: { ok: 'api is working well.' } });
  } else if (requestMetod === apiRequests.post && requestPath === apiPaths.user) {
    const registerData = event.body as string;
    const data = JSON.parse(registerData);
    const result = await insertFunction(data, dbTableNames.user);
    if (result.operation === 'error') {
      console.error('error');
      return buildResponse(400, { message: 'error', error: result.message });
    }
    const response = {
      id: result.data.id,
      username: result.data.username,
      email: result.data.email,
      filename: result.data.filename,
    };
    return buildResponse(201, { message: 'success', result: response });
  } else if (requestMetod === apiRequests.put && requestPath === apiPaths.user) {
    const param = event.queryStringParameters?.id as string;
    const registerData = event.body as string;
    const data = JSON.parse(registerData);
    const result = await updateFunction(param, data, dbTableNames.user);
    if (result.operation === 'error') {
      console.error('error');
      return buildResponse(400, { message: 'error', error: result.message });
    }
    const response = {
      id: result.data.id,
      username: result.data.username,
      email: result.data.email,
      filename: result.data.filename,
    };
    return buildResponse(201, { message: 'success', result: response });
  } else if (requestMetod === apiRequests.delete && requestPath === apiPaths.user) {
    const param = event.queryStringParameters?.id as string;
    const result = await deleteFunction(param, dbTableNames.user);
    if (result.operation === 'error') {
      console.error('error');
      return buildResponse(400, { message: 'error', error: result.message });
    }
    return buildResponse(201, { message: 'success', result: result });
  } else if (requestMetod === apiRequests.get && requestPath === apiPaths.user) {
    const param = event.queryStringParameters?.id as string;
    if (param) {
      const paramKey = Object.keys(event.queryStringParameters as Object)[0];
      const result = await getSingleData(paramKey, param, dbTableNames.user);
      return buildResponse(200, { message: 'success', data: { result: result } });
    } else {
      const result = await getUserData();
      return buildResponse(200, { message: 'success', data: { result: result } });
    }
  } else if (requestMetod === apiRequests.get && requestPath === apiPaths.role) {
    const result = await getRole();
    return buildResponse(200, { message: 'success', data: { result: result } });
  } else if (requestMetod === apiRequests.get && requestPath === apiPaths.department) {
    const result = await getDepartment();
    return buildResponse(200, { message: 'success', data: { result: result } });
  } else if (requestMetod === apiRequests.post && requestPath === apiPaths.login) {
    const loginData = event.body as string;
    const data = JSON.parse(loginData) as Object;
    const result = await getDataForTwoParameter(data, dbTableNames.user);
    if (result.operation === 'error') {
      console.log('error situation');
      return buildResponse(400, { message: 'error', error: result.message });
    }
    return buildResponse(200, {
      message: 'success',
      data: {
        id: result.data.id,
        username: result.data.username,
        email: result.data.email,
        filename: result.data.filename,
      },
    });
  }
  return buildResponse(400, { message: 'Bed Request' });
};

// build response
const buildResponse = (statusCode: Number, body: Object): Object => {
  return {
    statusCode,
    headers: {
      ContentType: 'Application/Json',
    },
    body: JSON.stringify(body),
  };
};
