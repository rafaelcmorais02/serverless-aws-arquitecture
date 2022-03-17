import AWS from 'aws-sdk';
import commomMiddleware from '../../lib/commomMiddleware';
import log from '../../lib/logger';

const stepFunctions = new AWS.StepFunctions();

async function consumer(event) {
  if (event.Records) {
    log.info(`Evento recebido por uma fila: ${event.Records[0]}`);
  } else if (event.detail) {
    log.info(`Evento recebido pelo Eventbridge: ${event.detail.body}`);
  } else {
    log.error('Evento do consumer checkoutOrders no formato incorreto');
    throw new Error('Evento do consumer checkoutOrders no formato incorreto');
  }
  const stateMachineName = 'stepFunctionExample';
  const listStateMachines = await stepFunctions.listStateMachines({}).promise();
  for (const stateMachine of listStateMachines.stateMachines) {
    if (stateMachine.name === stateMachineName) {
      const params = {
        stateMachineArn: stateMachine.stateMachineArn,
        input: event.Records ? event.Records[0].body : JSON.stringify(event.detail.body),
      };
      await stepFunctions.startExecution(params).promise();
      return {
        body: 'Step function stepFunctionExample invocada com sucesso',
      };
    }
  }
  return {
    body: 'Nenhuma Step Function encontrada',
  };
}
export const handler = commomMiddleware(consumer);
