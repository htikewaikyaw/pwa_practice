import { Handler, APIGatewayEvent } from 'aws-lambda';
import { apiRequests, apiPaths, dbTableNames } from './resources';
import { insertFunction } from './services/insert';

export const handler: Handler = async (event: APIGatewayEvent) => {
  const requestMetod = event.httpMethod;
  const requestPath = event.path;
  //user test
  if (requestMetod === apiRequests.get && requestPath === apiPaths.user_api_test) {
    return buildResponse(200, { message: 'success', data: { ok: 'api is working well.' } });
  } else if (requestMetod === apiRequests.post && requestPath === apiPaths.user) {
    console.log('testing................', event);
    const registerData = event.body as string;
    console.log(event.body);
    const data = JSON.parse(registerData);
    // const data = JSON.parse(registerData)
    const result = await insertFunction(data, dbTableNames.user);
    if (result.operation === 'error') {
       console.error("error")
      return buildResponse(400, { message: 'error', error: result.message });
    }
    const response = {
      id: result.data.id,
      username: result.data.username,
      email: result.data.email,
      filename: result.data.filename,
    };
    return buildResponse(201, { message: 'success', data: response });
    // return buildResponse(201, { message: 'success', data: data });
  } else if (requestMetod === apiRequests.get && requestPath === apiPaths.user) {
    const parram = event.queryStringParameters as Object;
    const paramKey = Object.keys(event.queryStringParameters as Object)[0];
    const tmp = parram[`${paramKey}` as keyof typeof parram] as unknown;
    const paramValue = tmp as string;
    return buildResponse(200, { message: 'success', data: { paramKey: paramValue } });
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
