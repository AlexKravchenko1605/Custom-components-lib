import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button', 'contained', 'colorPrimary', 'medium');
  });

  it('renders button with different variants', () => {
    const { rerender } = render(<Button variant="text">Text Button</Button>);
    let button = screen.getByRole('button', { name: /text button/i });
    expect(button).toHaveClass('text');

    rerender(<Button variant="outlined">Outlined Button</Button>);
    button = screen.getByRole('button', { name: /outlined button/i });
    expect(button).toHaveClass('outlined');
  });

  it('renders button with different colors', () => {
    const { rerender } = render(<Button color="secondary">Secondary Button</Button>);
    let button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toHaveClass('colorSecondary');

    rerender(<Button color="success">Success Button</Button>);
    button = screen.getByRole('button', { name: /success button/i });
    expect(button).toHaveClass('colorSuccess');
  });

  it('renders button with different sizes', () => {
    const { rerender } = render(<Button size="small">Small Button</Button>);
    let button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass('small');

    rerender(<Button size="large">Large Button</Button>);
    button = screen.getByRole('button', { name: /large button/i });
    expect(button).toHaveClass('large');
  });

  it('handles disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('colorDisabled');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom classes', () => {
    render(<Button classes="custom-class">Custom Button</Button>);
    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });
});
