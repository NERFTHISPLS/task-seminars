import styles from './SubmitDeleteModal.module.css';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';

import { ButtonType } from '../../types';

interface Props {
  onDeleteSeminar: () => void;
}

function SubmitDeleteSeminarModal({ onDeleteSeminar }: Props) {
  return (
    <Modal>
      <Modal.Control>
        <Button type={ButtonType.Danger}>Удалить</Button>
      </Modal.Control>

      <Modal.Content>
        <Modal.Header className={styles.header}>
          <span>Подтверждение удаления</span>
          <Modal.Close />
        </Modal.Header>

        <p className={styles.content}>
          Вы уверены, что хотите удалить семинар?
        </p>

        <Modal.Footer className={styles.footer}>
          <Modal.CancelButton>Отмена</Modal.CancelButton>
          <Modal.SubmitButton onSubmit={onDeleteSeminar}>
            Подтвердить
          </Modal.SubmitButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default SubmitDeleteSeminarModal;
