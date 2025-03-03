import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Modal from '../../components/Modal/Modal';

test('does not show content when modal is closed', () => {
  render(
    <Modal>
      <Modal.Content>Modal Content</Modal.Content>
    </Modal>
  );

  const content = screen.queryByText('Modal Content');

  expect(content).not.toBeInTheDocument();
});

test('opens modal when Control button is clicked', async () => {
  render(
    <Modal>
      <Modal.Control>
        <button>Open Modal</button>
      </Modal.Control>
      <Modal.Content>Modal Content</Modal.Content>
    </Modal>
  );

  fireEvent.click(screen.getByText('Open Modal'));

  const content = await screen.findByText('Modal Content');

  expect(content).toBeInTheDocument();
});

test('closes the modal when the close button is clicked', async () => {
  render(
    <Modal>
      <Modal.Control>
        <button>Open Modal</button>
      </Modal.Control>
      <Modal.Content>Modal Content</Modal.Content>
      <Modal.Close />
    </Modal>
  );

  fireEvent.click(screen.getByText('Open Modal'));

  const closeButton = screen.getByRole('button', { name: /×/ });

  fireEvent.click(closeButton);

  const content = screen.queryByText('Modal Content');

  expect(content).not.toBeInTheDocument();
});

test('renders the modal with a cancel button that closes the modal', async () => {
  render(
    <Modal>
      <Modal.Control>
        <button>Open Modal</button>
      </Modal.Control>
      <Modal.Content>
        <Modal.CancelButton>Cancel</Modal.CancelButton>
      </Modal.Content>
    </Modal>
  );

  fireEvent.click(screen.getByText('Open Modal'));

  const cancelButton = screen.getByText('Cancel');

  fireEvent.click(cancelButton);

  const content = screen.queryByText('Modal Content');

  expect(content).not.toBeInTheDocument();
});

test('renders the modal with a submit button that triggers onSubmit and closes the modal', async () => {
  const mockSubmit = jest.fn();
  render(
    <Modal>
      <Modal.Control>
        <button>Open Modal</button>
      </Modal.Control>
      <Modal.Content>
        <Modal.SubmitButton onSubmit={mockSubmit}>Submit</Modal.SubmitButton>
      </Modal.Content>
    </Modal>
  );

  fireEvent.click(screen.getByText('Open Modal'));

  const submitButton = screen.getByText('Submit');

  fireEvent.click(submitButton);

  await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));

  const content = screen.queryByText('Modal Content');

  expect(content).not.toBeInTheDocument();
});
