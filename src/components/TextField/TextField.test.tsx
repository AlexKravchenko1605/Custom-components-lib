import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { TextField } from './TextField';

describe('TextField Component', () => {
  it('renders text field with default props', () => {
    render(<TextField id="test-input" />);
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Name');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(input).toHaveClass('input', 'outlined', 'colorPrimary');
    expect(input).toHaveAttribute('placeholder', 'alex');
  });

  it('renders text field with different variants', () => {
    const { rerender } = render(<TextField id="test-input" variant="filled" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('filled');

    rerender(<TextField id="test-input" variant="standard" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('standard');
  });

  it('renders text field with different colors', () => {
    const { rerender } = render(<TextField id="test-input" color="secondary" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('colorSecondary');

    rerender(<TextField id="test-input" color="success" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('colorSuccess');
  });

  it('handles disabled state correctly', () => {
    render(<TextField id="test-input" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('colorDisabled');
  });

  it('calls onChange handler when input changes', () => {
    const handleChange = jest.fn();
    render(<TextField id="test-input" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders with custom label and helper text', () => {
    render(<TextField id="test-input" label="Custom Label" helperText="Custom Helper Text" />);

    expect(screen.getByText('Custom Label')).toBeInTheDocument();
    expect(screen.getByText('Custom Helper Text')).toBeInTheDocument();
  });

  it('applies custom classes', () => {
    render(<TextField id="test-input" classes="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });
});
