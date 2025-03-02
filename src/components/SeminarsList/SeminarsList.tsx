import styles from './SeminarsList.module.css';

import { useSeminars } from '../../hooks/useSeminars';

import SeminarItem from '../Seminar/SeminarItem';

function SeminarsList() {
  const { isLoading, error, seminars } = useSeminars();

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
