import type { HTMLInputTypeAttribute } from 'react';
import styles from './FormRow.module.css';

interface Props {
  label: string;
  rowId: string;
  inputType?: HTMLInputTypeAttribute;
}

function FormRow({ label, rowId, inputType = 'text' }: Props) {
  return (
    <>
      <label className={styles.label} htmlFor={rowId}>
        {label}
      </label>

      <input className={styles.input} id={rowId} type={inputType} />
    </>
  );
}

export default FormRow;
