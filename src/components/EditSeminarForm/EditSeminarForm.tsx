import { type FormEvent, forwardRef, useState } from 'react';

import styles from './EditSeminarForm.module.css';

import FormRow from '../FormRow/FormRow';

import { Seminar } from '../../types';

interface Props {
  seminar: Seminar;
  onSubmit: (seminar: Seminar) => void;
}

const EditSeminarForm = forwardRef<HTMLFormElement, Props>(
  ({ seminar, onSubmit }: Props, ref) => {
    const [title, setTitle] = useState(seminar.title);
    const [description, setDescription] = useState(seminar.description);
    const [photo, setPhoto] = useState(seminar.photo);

    function submit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const edittedSeminar: Seminar = {
        ...seminar,
        title,
        description,
        photo,
        date: new Intl.DateTimeFormat('ru-RU').format(new Date()),
        time: new Intl.DateTimeFormat('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(),
      };

      onSubmit(edittedSeminar);
    }

    return (
      <form ref={ref} className={styles.form} onSubmit={submit}>
        <FormRow
          value={title}
          label="Заголовок"
          rowId="title"
          onChange={e => setTitle(e.target.value)}
        />

        <FormRow
          value={description}
          label="Краткое описание"
          rowId="description"
          onChange={e => setDescription(e.target.value)}
        />

        <FormRow
          value={photo}
          label="Фото (url)"
          rowId="photo"
          inputType="url"
          onChange={e => setPhoto(e.target.value)}
        />

        <button type="submit" style={{ display: 'none' }} />
      </form>
    );
  }
);

export default EditSeminarForm;
