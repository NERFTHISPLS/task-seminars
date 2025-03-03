import styles from './EditSeminarForm.module.css';

import FormRow from '../FormRow/FormRow';

function EditSeminarForm() {
  return (
    <form className={styles.form}>
      <FormRow label="Заголовок" rowId="title" />
      <FormRow label="Описание" rowId="description" />
      <FormRow label="Фото (url)" rowId="photo" inputType="url" />
    </form>
  );
}

export default EditSeminarForm;
