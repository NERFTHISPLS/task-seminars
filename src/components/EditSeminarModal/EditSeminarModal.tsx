import styles from './EditSeminarModal.module.css';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';

import { ButtonType } from '../../types';
import EditSeminarForm from '../EditSeminarForm/EditSeminarForm';

interface Props {
  onEditSeminar: () => void;
}

function EditSeminarModal({ onEditSeminar }: Props) {
  return (
    <Modal>
      <Modal.Control>
        <Button type={ButtonType.Success}>Редактировать</Button>
      </Modal.Control>

      <Modal.Content>
        <Modal.Header className={styles.header}>
          <span>Редактирование</span>
          <Modal.Close />
        </Modal.Header>

        <EditSeminarForm />

        <Modal.Footer className={styles.footer}>
          <Modal.CancelButton>Отмена</Modal.CancelButton>
          <Modal.SubmitButton onSubmit={onEditSeminar}>
            Редактировать
          </Modal.SubmitButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default EditSeminarModal;
