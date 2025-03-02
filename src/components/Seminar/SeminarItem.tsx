import { Seminar } from '../../types';
import styles from './SeminarItem.module.css';

interface Props {
  seminar: Seminar;
}

function SeminarItem({ seminar }: Props) {
  const [day, month, year] = seminar.date
    .split('.')
    .map(partOfDate => Number(partOfDate));

  const [hour, minutes] = seminar.time
    .split(':')
    .map(partOfTime => Number(partOfTime));

  const date = new Date(year, month - 1, day, hour, minutes);
  const dateTime = date.toISOString();
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
