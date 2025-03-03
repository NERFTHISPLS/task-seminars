import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SubmitDeleteSeminarModal from '../../components/SubmitDeleteModal/SubmitDeleteSeminarModal';

test('opens modal when Control button is clicked', async () => {
  render(<SubmitDeleteSeminarModal onDeleteSeminar={jest.fn()} />);

  const modalContent = screen.queryByText(
    'Вы уверены, что хотите удалить семинар?'
  );
  expect(modalContent).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('Удалить'));

  const content = await screen.findByText(
    'Вы уверены, что хотите удалить семинар?'
  );
  expect(content).toBeInTheDocument();
});

test('closes the modal when the Close button is clicked', async () => {
  render(<SubmitDeleteSeminarModal onDeleteSeminar={jest.fn()} />);

  fireEvent.click(screen.getByText('Удалить'));

  fireEvent.click(screen.getByRole('button', { name: /×/ }));

  const content = screen.queryByText('Вы уверены, что хотите удалить семинар?');
  expect(content).not.toBeInTheDocument();
});

test('calls onDeleteSeminar when the Submit button is clicked', async () => {
  const mockOnDelete = jest.fn();
  render(<SubmitDeleteSeminarModal onDeleteSeminar={mockOnDelete} />);

  fireEvent.click(screen.getByText('Удалить'));

  const submitButton = screen.getByText('Подтвердить');
  fireEvent.click(submitButton);

  await waitFor(() => expect(mockOnDelete).toHaveBeenCalledTimes(1));
});

test('closes modal when Cancel button is clicked', async () => {
  render(<SubmitDeleteSeminarModal onDeleteSeminar={jest.fn()} />);

  fireEvent.click(screen.getByText('Удалить'));

  const cancelButton = screen.getByText('Отмена');
  fireEvent.click(cancelButton);

  const content = screen.queryByText('Вы уверены, что хотите удалить семинар?');
  expect(content).not.toBeInTheDocument();
});

test('applies custom classNames to modal parts', () => {
  render(<SubmitDeleteSeminarModal onDeleteSeminar={jest.fn()} />);

  fireEvent.click(screen.getByText('Удалить'));

  const header = screen.getByText('Подтверждение удаления').parentElement;
  const content = screen.getByText(
    'Вы уверены, что хотите удалить семинар?'
  ).parentElement;
  const footer = screen.getByText('Отмена').parentElement;

  expect(header).toHaveClass('header');
  expect(content).toHaveClass('container');
  expect(footer).toHaveClass('footer');
});
