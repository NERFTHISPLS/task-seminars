import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  FETCH_SEMINARS_ERROR_TEXT,
  SEMINARS_ENDPOINT,
} from '../utils/constants';

import type { Seminar, SeminarsFetch } from '../types';

export function useSeminars(): SeminarsFetch {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSeminars(): Promise<void> {
      setIsLoading(true);

      try {
        const response = await axios.get<Seminar[]>(SEMINARS_ENDPOINT);
        const seminars = response.data;

        setSeminars(seminars);
      } catch {
        setError(FETCH_SEMINARS_ERROR_TEXT);
      } finally {
        setIsLoading(false);
      }
    }

    loadSeminars();
  }, []);

  async function deleteSeminar(id: number): Promise<void> {
    setIsLoading(true);

    try {
      await axios.delete(`${SEMINARS_ENDPOINT}/${id}`);

      const filteredSeminars = seminars.filter(seminar => seminar.id !== id);

      setSeminars(filteredSeminars);
    } catch {
      setError(FETCH_SEMINARS_ERROR_TEXT);
    } finally {
      setIsLoading(false);
    }
  }

  return { seminars, isLoading, error, deleteSeminar };
}
