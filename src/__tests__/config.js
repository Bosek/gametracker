import config from '../config';

test('default port is 3000', () => {
  expect(config.port).toBe(3000);
});

test('default is development mode', () => {
  expect(config.isDevelopment).toBe(true);
});
