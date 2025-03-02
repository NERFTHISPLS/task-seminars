import { Seminar } from '../types';

export function generateDateTimeFromSeminar({
  date: seminarDate,
  time: seminarTime,
}: Seminar): string {
  const [day, month, year] = seminarDate.split('.').map(stringToNumber);
  const [hour, minutes] = seminarTime.split(':').map(stringToNumber);

  const date = new Date(year, month - 1, day, hour, minutes);

  return date.toISOString();
}

export function stringToNumber(str: string): number {
  return Number(str);
}
