import { Seminar } from '../types';

export function generateDateTimeFromSeminar({
  date: seminarDate,
  time: seminarTime,
}: Seminar): string {
  const [day, month, year] = seminarDate.split('.');
  const [hour, minutes] = seminarTime.split(':');

  return `${year}-${month}-${day} ${hour}:${minutes}`;
}
