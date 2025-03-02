import type { Seminar } from '../types';
import { generateDateTimeFromSeminar } from '../utils/helpers';

test.each([
  [{ date: '01.02.2025', time: '10:00' }, '2025-02-01 10:00'],
  [{ date: '25.03.2022', time: '07:32' }, '2022-03-25 07:32'],
  [{ date: '05.05.2001', time: '00:00' }, '2001-05-05 00:00'],
])(
  'generates dateTime for time tag from seminar date and time: %o => %s',
  (mockedSeminar, dateTime) => {
    expect(generateDateTimeFromSeminar(mockedSeminar as Seminar)).toBe(
      dateTime
    );
  }
);
