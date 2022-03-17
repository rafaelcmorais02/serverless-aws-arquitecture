import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';

export default (handler) => {
  const wrappedHandler = middy(handler).use([
    httpJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
  ]);

  return wrappedHandler;
};

/*
httpJsonBodyParser: This middleware automatically parses HTTP requests with a JSON body and converts the body into an object

httpEventNormalizer: This middleware normalizes the API Gateway event, making sure that an object for queryStringParameters,
multiValueQueryStringParameters and pathParameters is always available (resulting in empty objects when no parameter is available),
this way you don't have to worry about adding extra if statements before trying to read a property and calling event.pathParameters

httpErrorHandler: Automatically handles uncaught errors that contain the properties statusCode (number) and message (string) and
creates a proper HTTP response for them (using the message and the status code provided by the error object). Additionally, support
for the property expose is included with a default value of statusCode < 500
*/
