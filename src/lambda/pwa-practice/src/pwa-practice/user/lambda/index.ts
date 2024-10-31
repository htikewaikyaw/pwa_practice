import { Handler, APIGatewayEvent } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayEvent) => {
    console.log('user.....',event);
    return buildResponse(200, { message: 'success user.....' });
}

// build response
const buildResponse = (statusCode: Number, body: Object): Object => {
    return {
        statusCode,
        headers: {
            "ContentType": "Application/Json"
        },
        body: JSON.stringify(body)
    }
};