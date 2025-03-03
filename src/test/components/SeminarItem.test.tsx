import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import SeminarItem from '../../components/Seminar/SeminarItem';

import type { Seminar } from '../../types';

const seminarMock: Seminar = {
  id: 1,
  title: 'Seminar 1',
  description: 'Description 1',
  date: '01.12.2025',
  time: '10:00',
  photo: 'seminar.jpg',
};

const date = `${seminarMock.date} ${seminarMock.time}`;
const mockedDateTimeAttr = '2025-12-01T10:00:00';

jest.mock('../../utils/helpers.ts', () => ({
  generateDateTimeFromSeminar: jest.fn(() => mockedDateTimeAttr),
}));

test('shows title and desription', () => {
  render(<SeminarItem seminar={seminarMock} onDeleteSemianar={() => {}} />);

  expect(screen.getByText(seminarMock.title)).toBeInTheDocument();
  expect(screen.getByText(seminarMock.description)).toBeInTheDocument();
});

test('shows img with correct src and alt', () => {
  render(<SeminarItem seminar={seminarMock} onDeleteSemianar={() => {}} />);
  const img = screen.getByRole('img');

  expect(img).toHaveAttribute('src', seminarMock.photo);
  expect(img).toHaveAttribute('alt', seminarMock.title);
});

test('shows correct date and time', () => {
  render(<SeminarItem seminar={seminarMock} onDeleteSemianar={() => {}} />);

  expect(screen.getByText(date)).toBeInTheDocument();
});

test('checks if time tag has correct datetime', () => {
  render(<SeminarItem seminar={seminarMock} onDeleteSemianar={() => {}} />);

  const timeElement = screen.getByText(date);

  expect(timeElement).toHaveAttribute('datetime', mockedDateTimeAttr);
});
