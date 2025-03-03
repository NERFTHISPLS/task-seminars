import type { ReactNode } from 'react';

import styles from './Button.module.css';

import { ButtonType } from '../../types';

interface Props {
  className?: string;
  type?: ButtonType;
  onClick?: () => void;
  children: ReactNode;
}

function Button({
  className = '',
  type = ButtonType.Neutral,
  onClick = () => {},
  children,
}: Props) {
  const classes = `${styles[type]} ${className}`;

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
