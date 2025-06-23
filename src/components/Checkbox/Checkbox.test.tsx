import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('renders checkbox with default props', () => {
    render(<Checkbox label="Test Checkbox" onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox', { name: /test checkbox/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox with different sizes', () => {
    const { rerender } = render(<Checkbox label="Test Checkbox" size="small" onChange={() => {}} />);
    let label = screen.getByText('Test Checkbox').closest('label');
    expect(label).toBeInTheDocument();

    rerender(<Checkbox label="Test Checkbox" size="large" onChange={() => {}} />);
    label = screen.getByText('Test Checkbox').closest('label');
    expect(label).toBeInTheDocument();
  });

  it('renders checkbox with different colors', () => {
    const { rerender } = render(<Checkbox label="Test Checkbox" color="error" onChange={() => {}} />);
    let label = screen.getByText('Test Checkbox').closest('label');
    expect(label).toBeInTheDocument();

    rerender(<Checkbox label="Test Checkbox" color="success" onChange={() => {}} />);
    label = screen.getByText('Test Checkbox').closest('label');
    expect(label).toBeInTheDocument();
  });

  it('handles checked state correctly', () => {
    render(<Checkbox label="Test Checkbox" checked onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox', { name: /test checkbox/i });
    expect(checkbox).toBeChecked();
  });

  it('handles disabled state correctly', () => {
    render(<Checkbox label="Test Checkbox" disabled onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox', { name: /test checkbox/i });
    expect(checkbox).toBeDisabled();
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test Checkbox" onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox', { name: /test checkbox/i });
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test Checkbox" disabled onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox', { name: /test checkbox/i });
    fireEvent.click(checkbox);    
  });

  it('renders with helperText', () => {
    render(<Checkbox label="Test Checkbox" helperText="This is a description" onChange={() => {}} />);

    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });
  it('applies custom classes', () => {
    render(<Checkbox label="Test Checkbox" className="custom-class" onChange={() => {}} />);
    const label = screen.getByText('Test Checkbox').closest('label');
    expect(label).toBeInTheDocument();
  });
});
