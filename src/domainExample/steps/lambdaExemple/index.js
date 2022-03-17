import commomMiddleware from '../../../../lib/commomMiddleware';
import log from '../../../../lib/logger';

async function lamndaExample(event) {
  log.info(JSON.stringify(event));
  return {
    message: 'Exemplo',
  };
}
export const handler = commomMiddleware(lamndaExample);
