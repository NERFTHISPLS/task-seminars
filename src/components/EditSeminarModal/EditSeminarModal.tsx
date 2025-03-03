import { useRef } from 'react';

import styles from './EditSeminarModal.module.css';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';

import { ButtonType, Seminar } from '../../types';
import EditSeminarForm from '../EditSeminarForm/EditSeminarForm';

interface Props {
  seminar: Seminar;
  onEditSeminar: (seminar: Seminar) => void;
}

function EditSeminarModal({ seminar, onEditSeminar }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(seminar: Seminar) {
    onEditSeminar(seminar);
  }

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

        <EditSeminarForm
          ref={formRef}
          seminar={seminar}
          onSubmit={handleSubmit}
        />

        <Modal.Footer className={styles.footer}>
          <Modal.CancelButton>Отмена</Modal.CancelButton>
          <Modal.SubmitButton onSubmit={() => formRef.current?.requestSubmit()}>
            Редактировать
          </Modal.SubmitButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default EditSeminarModal;
