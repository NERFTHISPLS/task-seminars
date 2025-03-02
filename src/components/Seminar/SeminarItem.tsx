import { Seminar } from '../../types';
import { generateDateTimeFromSeminar } from '../../utils/helpers';
import styles from './SeminarItem.module.css';

interface Props {
  seminar: Seminar;
}

function SeminarItem({ seminar }: Props) {
  const dateTime = generateDateTimeFromSeminar(seminar);
  const formattedDate = `${seminar.date} ${seminar.time}`;

  return (
    <li className={styles.item}>
      <a href="#">
        <img src={seminar.photo} alt={seminar.title} />
      </a>

      <div className={styles.info}>
        <div className={styles.description}>
          <h2>
            <a href="#">{seminar.title}</a>
          </h2>
          <p>{seminar.description}</p>
        </div>

        <time dateTime={dateTime}>{formattedDate}</time>
      </div>
    </li>
  );
}

export default SeminarItem;
