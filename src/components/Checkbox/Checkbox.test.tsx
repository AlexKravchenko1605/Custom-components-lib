import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('renders checkbox with default props', () => {
    render(<Checkbox label="Test Checkbox" />);
    const checkbox = screen.getByRole('checkbox', { name: /test checkbox/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox with different sizes', () => {
    const { rerender } = render(<Checkbox label="Test Checkbox" size="small" />);
    let wrapper = screen.getByText('Test Checkbox').closest('label');
    expect(wrapper).toHaveClass('small');

    rerender(<Checkbox label="Test Checkbox" size="large" />);
    wrapper = screen.getByText('Test Checkbox').closest('label');
    expect(wrapper).toHaveClass('large');
  });

  it('renders checkbox with different colors', () => {
    const { rerender } = render(<Checkbox label="Test Checkbox" color="error" />);
    let icon = screen.getByText('Test Checkbox').previousElementSibling;
    expect(icon).toHaveClass('colorError');

    rerender(<Checkbox label="Test Checkbox" color="success" />);
    icon = screen.getByText('Test Checkbox').previousElementSibling;
    expect(icon).toHaveClass('colorSuccess');
  });

  it('handles checked state correctly', () => {
    render(<Checkbox label="Test Checkbox" checked />);
    const checkbox = screen.getByRole('checkbox', { name: /test checkbox/i });
    expect(checkbox).toBeChecked();
  });

  it('handles disabled state correctly', () => {
    render(<Checkbox label="Test Checkbox" disabled />);
    const checkbox = screen.getByRole('checkbox', { name: /test checkbox/i });
    const wrapper = screen.getByText('Test Checkbox').closest('label');
    expect(checkbox).toBeDisabled();
    expect(wrapper).toHaveClass('disabled');
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
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with description', () => {
    render(<Checkbox label="Test Checkbox" description="This is a description" />);

    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('handles error state', () => {
    render(<Checkbox label="Test Checkbox" error />);
    const icon = screen.getByText('Test Checkbox').previousElementSibling;
    expect(icon).toHaveClass('error');
  });

  it('applies custom classes', () => {
    render(<Checkbox label="Test Checkbox" className="custom-class" />);
    const wrapper = screen.getByText('Test Checkbox').closest('label');
    expect(wrapper).toHaveClass('custom-class');
  });
});
