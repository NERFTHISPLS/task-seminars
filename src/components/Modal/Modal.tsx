import { createPortal } from 'react-dom';
import {
  cloneElement,
  createContext,
  ReactElement,
  type ReactNode,
  useContext,
  useState,
} from 'react';

import styles from './Modal.module.css';

import Button from '../Button/Button';
import { ButtonType } from '../../types';

interface Props {
  children?: ReactNode;
  className?: string;
}

interface ModalControlProps {
  children: ReactElement<{ onClick?: () => void }>;
}

interface SubmitButtonProps extends Props {
  disabled?: boolean;
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
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <ModalContext.Provider value={{ isOpen, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Control({ children }: ModalControlProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: open,
  });
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
  const { isOpen } = useContext(ModalContext);

  if (!isOpen) return null;

  return createPortal(
    <div className={`${styles.content} ${className}`}>
      <div className={styles.container}>{children}</div>
      <div className={styles.overlay}></div>
    </div>,
    document.body
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

function SubmitButton({ onSubmit, children }: SubmitButtonProps) {
  const { close } = useContext(ModalContext);

  function handleSubmit() {
    onSubmit?.();
    close();
  }

  return (
    <Button type={ButtonType.Success} onClick={handleSubmit}>
      {children}
    </Button>
  );
}

Modal.Control = Control;
Modal.Header = Header;
Modal.Close = Close;
Modal.Content = Content;
Modal.Footer = Footer;
Modal.CancelButton = CancelButton;
Modal.SubmitButton = SubmitButton;

export default Modal;
