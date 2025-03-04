import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import * as useSeminars from '../../hooks/useSeminars';

import SeminarsList from '../../components/SeminarsList/SeminarsList';

import type { Seminar } from '../../types';

const useSeminarsSpy = jest.spyOn(useSeminars, 'useSeminars');
const mockDeleteSeminar = jest.fn();

test('shows loading indicator when fetching data', () => {
  useSeminarsSpy.mockReturnValue({
    isLoading: true,
    error: '',
    seminars: [],
    deleteSeminar: mockDeleteSeminar,
  });

  const { container } = render(<SeminarsList />);

  expect(container.querySelector('.loader')).toBeInTheDocument();
});

test('shows error when fetch failed', () => {
  useSeminarsSpy.mockReturnValue({
    isLoading: false,
    error: 'Error occurred',
    seminars: [],
    deleteSeminar: mockDeleteSeminar,
  });

  const { container } = render(<SeminarsList />);

  expect(container.querySelector('.loader')).not.toBeInTheDocument();
  expect(screen.getByText('Error occurred')).toBeInTheDocument();
});

test('shows message when seminars list is empty', () => {
  useSeminarsSpy.mockReturnValue({
    isLoading: false,
    error: '',
    seminars: [],
    deleteSeminar: mockDeleteSeminar,
  });

  const { container } = render(<SeminarsList />);

  expect(container.querySelector('.loader')).not.toBeInTheDocument();
  expect(screen.getByText('Список семинаров пуст :(')).toBeInTheDocument();
});

test('shows seminars when loaded', () => {
  const seminarsMock: Seminar[] = [
    {
      id: 1,
      title: 'Seminar 1',
      description: 'Description 1',
      date: '02.03.2025',
      time: '10:00',
      photo: 'url 1',
    },
    {
      id: 2,
      title: 'Seminar 2',
      description: 'Description 2',
      date: '02.04.2025',
      time: '09:00',
      photo: 'url 2',
    },
  ];
  useSeminarsSpy.mockReturnValue({
    isLoading: false,
    error: '',
    seminars: seminarsMock,
    deleteSeminar: mockDeleteSeminar,
  });

  const { container } = render(<SeminarsList />);

  expect(container.querySelector('.loader')).not.toBeInTheDocument();
  expect(screen.getByText('Seminar 1')).toBeInTheDocument();
  expect(screen.getByText('Seminar 2')).toBeInTheDocument();
});

test('calls deleteSeminar when seminar is deleted', async () => {
  const seminarsMock: Seminar[] = [
    {
      id: 1,
      title: 'Seminar 1',
      description: 'Description 1',
      date: '02.03.2025',
      time: '10:00',
      photo: 'url 1',
    },
    {
      id: 2,
      title: 'Seminar 2',
      description: 'Description 2',
      date: '02.04.2025',
      time: '09:00',
      photo: 'url 2',
    },
  ];
  useSeminarsSpy.mockReturnValue({
    isLoading: false,
    error: '',
    seminars: seminarsMock,
    deleteSeminar: mockDeleteSeminar,
  });

  render(<SeminarsList />);

  fireEvent.click(screen.getAllByText('Удалить')[0]);
  fireEvent.click(screen.getByText('Подтвердить'));

  await waitFor(() => expect(mockDeleteSeminar).toHaveBeenCalledTimes(1));
});
