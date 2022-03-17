import { handler } from '../../../../src/domainExample/steps/lambdaExemple/index';

test('Verifica se a função existe', () => {
  expect(typeof handler).toBeDefined();
});
