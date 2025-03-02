import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  FETCH_SEMINARS_ERROR_TEXT,
  SEMINARS_ENDPOINT,
} from '../utils/constants';

import type { Seminar, SeminarsFetchState } from '../types';

export function useSeminars(): SeminarsFetchState {
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
      } catch (err) {
        console.error(err);

        setError(FETCH_SEMINARS_ERROR_TEXT);
      } finally {
        setIsLoading(false);
      }
    }

    loadSeminars();
  }, []);

  return { seminars, isLoading, error };
}
