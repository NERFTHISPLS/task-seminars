import { Seminar } from '../../types';

import { generateDateTimeFromSeminar } from '../../utils/helpers';

import styles from './SeminarItem.module.css';

import SubmitDeleteSeminarModal from '../SubmitDeleteModal/SubmitDeleteSeminarModal';

interface Props {
  seminar: Seminar;
  onDeleteSemianar: () => void;
}

function SeminarItem({ seminar, onDeleteSemianar }: Props) {
  const dateTime = generateDateTimeFromSeminar(seminar);
  const formattedDate = `${seminar.date} ${seminar.time}`;

  return (
    <li className={styles.item}>
      <a href="#">
        <img src={seminar.photo} alt={seminar.title} />
      </a>

      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={styles.description}>
            <h2>
              <a href="#">{seminar.title}</a>
            </h2>
            <p>{seminar.description}</p>
          </div>

          <SubmitDeleteSeminarModal onDeleteSeminar={onDeleteSemianar} />
        </div>

        <time dateTime={dateTime}>{formattedDate}</time>
      </div>
    </li>
  );
}

export default SeminarItem;
