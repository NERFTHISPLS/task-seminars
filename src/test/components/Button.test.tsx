import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from '../../components/Button/Button';

import { ButtonType } from '../../types';

const mockOnClick = jest.fn();

it('renders the button with children', () => {
  render(<Button>Click Me</Button>);

  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Click Me');
});

it('applies the default type "Neutral" class', () => {
  render(<Button>Click Me</Button>);

  const button = screen.getByRole('button');

  expect(button).toHaveClass('neutral');
});

it('applies a custom className', () => {
  render(<Button className="custom-class">Click Me</Button>);

  const button = screen.getByRole('button');

  expect(button).toHaveClass('custom-class');
});

it('applies the correct class for a custom type', () => {
  render(<Button type={ButtonType.Danger}>Danger Button</Button>);

  const button = screen.getByRole('button');

  expect(button).toHaveClass('danger');
});

it('calls the onClick function when clicked', () => {
  render(<Button onClick={mockOnClick}>Click Me</Button>);

  const button = screen.getByRole('button');

  fireEvent.click(button);

  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
