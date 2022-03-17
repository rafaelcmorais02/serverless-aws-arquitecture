import AWS from 'aws-sdk';
import commomMiddleware from '../../lib/commomMiddleware';
import log from '../../lib/logger';

const stepFunctions = new AWS.StepFunctions();

async function consumerDLQ(event) {
  const record = event.Records[0];
  log.info(record.body);
  const stateMachineName = 'checkoutOrders';
  const listStateMachines = await stepFunctions.listStateMachines({}).promise();
  for (const stateMachine of listStateMachines.stateMachines) {
    if (stateMachine.name === stateMachineName) {
      const params = {
        stateMachineArn: stateMachine.stateMachineArn,
        input: record.body,
      };
      await stepFunctions.startExecution(params).promise();
      await new Promise((resolve) => {
        return setTimeout(resolve, 500);
      });
      return {
        body: 'Step function checkoutOrders invocada com sucesso',
      };
    }
  }
  return {
    body: 'Nenhuma Step Function encontrada',
  };
}
export const handler = commomMiddleware(consumerDLQ);
