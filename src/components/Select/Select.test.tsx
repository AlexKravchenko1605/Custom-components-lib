import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { Select } from './Select';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
];

describe('Select Component', () => {
  it('renders select with default props', () => {
    render(<Select options={mockOptions} onChange={() => {}} value="" />);
    const select = screen.getByRole('button');
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Select an option');
  });

  it('renders select with different sizes', () => {
    const { rerender } = render(
      <Select options={mockOptions} onChange={() => {}} size="small" value="" />,
    );
    let wrapper = screen.getByRole('button').closest('div');
    expect(wrapper).toHaveClass('small');

    rerender(<Select options={mockOptions} onChange={() => {}} size="large" value="" />);
    wrapper = screen.getByRole('button').closest('div');
    expect(wrapper).toHaveClass('large');
  });

  it('handles disabled state correctly', () => {
    render(<Select options={mockOptions} onChange={() => {}} disabled value="" />);
    const select = screen.getByRole('button');
    expect(select).toHaveClass('disabled');
  });

  it('handles error state correctly', () => {
    render(<Select options={mockOptions} onChange={() => {}} error value="" />);
    const select = screen.getByRole('button');
    expect(select).toHaveClass('error');
  });

  it('opens options list when clicked', () => {
    render(<Select options={mockOptions} onChange={() => {}} value="" />);
    const select = screen.getByRole('button');
    fireEvent.click(select);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} value="" />);

    const select = screen.getByRole('button');
    fireEvent.click(select);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('does not call onChange when disabled option is clicked', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} value="" />);

    const select = screen.getByRole('button');
    fireEvent.click(select);

    const disabledOption = screen.getByText('Option 3');
    fireEvent.click(disabledOption);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with label and helper text', () => {
    render(
      <Select
        options={mockOptions}
        onChange={() => {}}
        label="Test Label"
        helperText="Helper Text"
        value=""
      />,
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Helper Text')).toBeInTheDocument();
  });

  it('handles required state', () => {
    render(
      <Select options={mockOptions} onChange={() => {}} label="Test Label" required value="" />,
    );

    const requiredMark = screen.getByText('*');
    expect(requiredMark).toBeInTheDocument();
    expect(requiredMark).toHaveStyle({ color: 'var(--error-color)' });
  });

  it('closes options list when clicking outside', () => {
    render(<Select options={mockOptions} onChange={() => {}} value="" />);

    const select = screen.getByRole('button');
    fireEvent.click(select);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('applies custom classes', () => {
    render(<Select options={mockOptions} onChange={() => {}} className="custom-class" value="" />);

    const wrapper = screen.getByRole('button').closest('div');
    expect(wrapper).toHaveClass('custom-class');
  });
});
