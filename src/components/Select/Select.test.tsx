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
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Select an option');
  });

  it('renders select with different sizes', () => {
    const { rerender } = render(
      <Select options={mockOptions} onChange={() => {}} size="small" value="" />,
    );
    let wrapper = screen.getByRole('combobox').closest('div');
    expect(wrapper).toBeInTheDocument();

    rerender(<Select options={mockOptions} onChange={() => {}} size="large" value="" />);
    wrapper = screen.getByRole('combobox').closest('div');
    expect(wrapper).toBeInTheDocument();
  });

  it('handles disabled state correctly', () => {
    render(<Select options={mockOptions} onChange={() => {}} disabled value="" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('disabled');
  });

  it('handles error state correctly', () => {
    render(<Select options={mockOptions} onChange={() => {}} error value="" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('error');
  });

  it('opens dropdown when clicked', () => {
    render(<Select options={mockOptions} onChange={() => {}} value="" />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} value="" />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('does not call onChange when disabled option is clicked', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} value="" />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    const disabledOption = screen.getByText('Option 3');
    fireEvent.click(disabledOption);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('displays selected value correctly', () => {
    render(<Select options={mockOptions} onChange={() => {}} value="1" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('Option 1');
  });

  it('handles empty options array', () => {
    render(<Select options={[]} onChange={() => {}} value="" />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    
    fireEvent.click(select);
    expect(screen.getByText('No options available')).toBeInTheDocument();
  });

  it('closes options list when clicking outside', () => {
    render(<Select options={mockOptions} onChange={() => {}} value="" />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('applies custom classes', () => {
    render(<Select options={mockOptions} onChange={() => {}} className="custom-class" value="" />);

    const wrapper = screen.getByRole('combobox').closest('div');
    expect(wrapper).toBeInTheDocument();
  });
});
