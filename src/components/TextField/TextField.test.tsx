import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { TextField } from './TextField';

describe('TextField Component', () => {
  it('renders text field with default props', () => {
    render(<TextField id="test-input" label="Name" />);
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Name');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('renders text field with different variants', () => {
    const { rerender } = render(<TextField id="test-input" variant="filled" />);
    let input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    rerender(<TextField id="test-input" variant="standard" />);
    input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders text field with different colors', () => {
    const { rerender } = render(<TextField id="test-input" color="secondary" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('colorSecondary');

    rerender(<TextField id="test-input" color="error" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('colorError');
  });

  it('handles disabled state correctly', () => {
    render(<TextField id="test-input" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled');
  });

  it('calls onChange handler when input changes', () => {
    const handleChange = jest.fn();
    render(<TextField id="test-input" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with helper text', () => {
    render(<TextField id="test-input" helperText="This is helper text" />);

    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('handles error state correctly', () => {
    render(<TextField id="test-input" error helperText="Error message" />);
    const input = screen.getByRole('textbox');
    const helperText = screen.getByText('Error message');

    expect(input).toHaveClass('error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(helperText).toHaveClass('error');
  });

  it('applies custom classes', () => {
    render(<TextField id="test-input" className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });
});
