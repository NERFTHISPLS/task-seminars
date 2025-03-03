import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './FormRow.module.css';

interface Props {
  value: string;
  label: string;
  rowId: string;
  inputType?: HTMLInputTypeAttribute;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormRow({ value, label, rowId, inputType = 'text', onChange }: Props) {
  return (
    <>
      <label className={styles.label} htmlFor={rowId}>
        {label}
      </label>

      <input
        className={styles.input}
        id={rowId}
        type={inputType}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default FormRow;
