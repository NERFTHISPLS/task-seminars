import styles from './SeminarsList.module.css';

import Seminar from '../Seminar/Seminar';

function SeminarsList() {
  return (
    <ul className={styles.list}>
      <Seminar />
    </ul>
  );
}

export default SeminarsList;
