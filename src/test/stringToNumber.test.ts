import { stringToNumber } from '../utils/helpers';

test('converts string to number', () => {
  expect(stringToNumber('123')).toBe(123);
});
