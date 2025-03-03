import Modal from '../Modal/Modal';

import styles from './SubmitDeleteModal.module.css';

function SubmitDeleteModal() {
  return (
    <>
      <Modal>
        <Modal.Header className={styles.header}>
          <span>Подтверждение</span>
          <Modal.Close />
        </Modal.Header>

        <Modal.Content>Вы уверены, что хотите удалить семинар?</Modal.Content>

        <Modal.Footer className={styles.footer}>
          <Modal.CancelButton>Отмена</Modal.CancelButton>
          <Modal.SubmitButton>Подтвердить</Modal.SubmitButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SubmitDeleteModal;
