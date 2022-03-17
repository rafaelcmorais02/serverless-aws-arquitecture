import jwt from 'jsonwebtoken';
import commomMiddleware from '../commomMiddleware';

async function automationAuth(event) {
  const automationAuthKey = JSON.parse(process.env.AUTOMATION_AUTH_JWT_KEY || '{}');
  if (!event.authorizationToken) {
    throw new Error('Unauthorized');
  }
  const token = event.authorizationToken;

  try {
    jwt.verify(token, automationAuthKey.key);
    const policy = generatePolicy(event.methodArn);
    return {
      ...policy,
    };
  } catch (error) {
    throw new Error('Unauthorized');
  }
}

export const handler = commomMiddleware(automationAuth);

const generatePolicy = (methodArn) => {
  const apiGatewayWildcard = `${methodArn.split('/', 2).join('/')}/*`;
  return {
    policyDocument: {
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: apiGatewayWildcard,
        },
      ],
    },
  };
};
