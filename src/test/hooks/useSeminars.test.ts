import { renderHook, waitFor } from '@testing-library/react';
import { useSeminars } from '../../hooks/useSeminars';
import axios from 'axios';
import {
  DELETE_SEMINARS_ERROR_TEXT,
  FETCH_SEMINARS_ERROR_TEXT,
  SEMINARS_ENDPOINT,
} from '../../utils/constants';
import { act } from 'react';

const axiosGetSpy = jest.spyOn(axios, 'get');
const axiosDeleteSpy = jest.spyOn(axios, 'delete');

test('returns initial state when fetching is not done yet', async () => {
  axiosGetSpy.mockResolvedValue({ data: [] });

  const { result } = renderHook(() => useSeminars());

  expect(result.current.seminars).toEqual([]);
  expect(result.current.error).toBe('');

  await waitFor(() => expect(result.current.isLoading).toBe(false));
});

test('successfully loads seminars and updates state', async () => {
  const mockSeminars = [
    {
      id: 1,
      title: 'Seminar 1',
      description: 'Description 1',
      date: '2025-12-01',
      time: '10:00',
      photo: 'seminar1.jpg',
    },
    {
      id: 2,
      title: 'Seminar 2',
      description: 'Description 2',
      date: '2025-12-02',
      time: '12:00',
      photo: 'seminar2.jpg',
    },
  ];

  axiosGetSpy.mockResolvedValue({ data: mockSeminars });

  const { result } = renderHook(() => useSeminars());

  await waitFor(() => expect(result.current.isLoading).toBe(false));

  expect(result.current.seminars).toEqual(mockSeminars);
  expect(result.current.error).toBe('');
});

test('sets an error when fetching is failed', async () => {
  axiosGetSpy.mockRejectedValue(new Error('Some error'));

  const { result } = renderHook(() => useSeminars());

  await waitFor(() => {
    expect(result.current.error).toBe(FETCH_SEMINARS_ERROR_TEXT);
  });

  expect(result.current.seminars).toEqual([]);
  expect(result.current.isLoading).toBe(false);
});

test('deletes seminar when success', async () => {
  const mockSeminars = [
    {
      id: 1,
      title: 'Seminar 1',
      description: 'Description 1',
      date: '2025-12-01',
      time: '10:00',
      photo: 'seminar1.jpg',
    },
  ];
  const { result } = renderHook(() => useSeminars());

  axiosDeleteSpy.mockResolvedValue({});

  act(() => {
    result.current.deleteSeminar(mockSeminars[0].id);
  });

  expect(axiosDeleteSpy).toHaveBeenCalledWith(`${SEMINARS_ENDPOINT}/1`);

  expect(result.current.seminars).toEqual([]);

  await waitFor(() => expect(result.current.isLoading).toBe(false));
});

test('sets an error when there was an error while deleting', async () => {
  const mockSeminars = [
    {
      id: 1,
      title: 'Seminar 1',
      description: 'Description 1',
      date: '2025-12-01',
      time: '10:00',
      photo: 'seminar1.jpg',
    },
  ];

  axiosGetSpy.mockResolvedValue({ data: mockSeminars });

  const { result } = renderHook(() => useSeminars());

  axiosDeleteSpy.mockRejectedValue(new Error('Error'));

  act(() => {
    result.current.deleteSeminar(1);
  });

  await waitFor(() =>
    expect(result.current.error).toBe(DELETE_SEMINARS_ERROR_TEXT)
  );

  await waitFor(() => expect(result.current.seminars).toEqual(mockSeminars));

  await waitFor(() => expect(result.current.isLoading).toBe(false));
});
