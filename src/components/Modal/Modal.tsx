import { createPortal } from 'react-dom';
import { createContext, useContext, useState, type ReactNode } from 'react';

import styles from './Modal.module.css';

import Button from '../Button/Button';
import { ButtonType } from '../../types';

interface Props {
  children?: ReactNode | ReactNode[];
  className?: string;
}

interface SubmitButtonProps extends Props {
  onSubmit?: () => void;
}

interface ModalContext {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

const ModalContext = createContext<ModalContext>({
  isOpen: false,
  close: () => {},
  open: () => {},
});

function Modal({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ isOpen, close, open }}>
      <div className={styles.container}>{children}</div>
      <div className={styles.overlay}></div>
    </ModalContext.Provider>,
    document.body
  );
}

function Header({ className = '', children }: Props) {
  return <header className={className}>{children}</header>;
}

function Close({ className = '' }: Props) {
  const { close } = useContext(ModalContext);

  return (
    <button className={`${styles.closeButton} ${className}`} onClick={close}>
      &times;
    </button>
  );
}

function Content({ className = '', children }: Props) {
  return (
    <div className={`${styles.content} ${className}`}>
      <div>{children}</div>
    </div>
  );
}

function Footer({ className = '', children }: Props) {
  return (
    <footer className={`${styles.footer} ${className}`}>{children}</footer>
  );
}

function CancelButton({ children }: Props) {
  const { close } = useContext(ModalContext);

  return (
    <Button type={ButtonType.Danger} onClick={close}>
      {children}
    </Button>
  );
}

function SubmitButton({ onSubmit = () => {}, children }: SubmitButtonProps) {
  const { close } = useContext(ModalContext);

  function handleSubmit() {
    onSubmit();
    close();
  }

  return (
    <Button type={ButtonType.Success} onClick={handleSubmit}>
      {children}
    </Button>
  );
}

Modal.Header = Header;
Modal.Close = Close;
Modal.Content = Content;
Modal.Footer = Footer;
Modal.CancelButton = CancelButton;
Modal.SubmitButton = SubmitButton;

export default Modal;
