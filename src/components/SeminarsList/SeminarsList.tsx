import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './SeminarsList.module.css';

import { API_URL } from '../../utils/constants';

import SeminarItem from '../Seminar/SeminarItem';

import type { Seminar } from '../../types';

function SeminarsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [seminars, setSeminars] = useState<Seminar[]>([]);

  useEffect(() => {
    async function loadSeminars() {
      const url = `${API_URL}/seminars`;
      setIsLoading(true);

      try {
        const response = await axios.get<Seminar[]>(url);
        const seminars = response.data;

        setSeminars(seminars);
      } catch (err) {
        console.error(err);

        setError('Что-то пошло не так во время загрузки данных о семинарах :(');
      } finally {
        setIsLoading(false);
      }
    }

    loadSeminars();
  }, []);

  if (isLoading) {
    return <div className={styles.loader}></div>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (seminars.length === 0) {
    return <p className={styles.empty}>Список семинаров пуст :(</p>;
  }

  return (
    <ul className={styles.list}>
      {seminars.map(seminar => (
        <SeminarItem key={seminar.id} seminar={seminar} />
      ))}
    </ul>
  );
}

export default SeminarsList;
