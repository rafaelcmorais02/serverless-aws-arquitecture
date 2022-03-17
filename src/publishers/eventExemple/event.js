import AWS from 'aws-sdk';
import commomMiddleware from '../../../lib/commomMiddleware';
import log from '../../../lib/logger';

const eventbridge = new AWS.EventBridge();

async function events(event) {
  log.info(event);
  switch (event.body.eventType) {
    case 'eventTest':
      try {
        const eventBridgeResult = await eventbridge
          .putEvents({
            Entries: [
              {
                Detail: JSON.stringify(event),
                DetailType: 'eventTest',
                Source: 'event.test',
              },
            ],
          })
          .promise();
        return {
          statusCode: 200,
          body: JSON.stringify(eventBridgeResult),
        };
      } catch (err) {
        log.err(err);
        return {
          statusCode: 400,
          body: {
            message: 'erro ao enviar informação para o Event Bridge',
          },
        };
      }
    default:
      return {
        statusCode: 400,
        body: { message: 'tipo da ação não identificada' },
      };
  }
}
export const handler = commomMiddleware(events);
