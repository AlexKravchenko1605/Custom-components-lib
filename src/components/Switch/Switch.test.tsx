import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { Switch } from './Switch';

describe('Switch Component', () => {
  it('renders switch with default props', () => {
    render(<Switch label="Test Switch" />);
    const switchElement = screen.getByRole('switch', { name: /test switch/i });
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  });

  it('renders switch with different sizes', () => {
    const { rerender } = render(<Switch label="Test Switch" size="small" />);
    let wrapper = screen.getByText('Test Switch').closest('label');
    expect(wrapper).toHaveClass('small');

    rerender(<Switch label="Test Switch" size="large" />);
    wrapper = screen.getByText('Test Switch').closest('label');
    expect(wrapper).toHaveClass('large');
  });

  it('renders switch with different colors', () => {
    const { rerender } = render(<Switch label="Test Switch" color="secondary" />);
    let track = screen.getByText('Test Switch').previousElementSibling;
    expect(track).toHaveClass('colorSecondary');

    rerender(<Switch label="Test Switch" color="error" />);
    track = screen.getByText('Test Switch').previousElementSibling;
    expect(track).toHaveClass('colorError');
  });

  it('handles checked state correctly', () => {
    render(<Switch label="Test Switch" checked />);
    const switchElement = screen.getByRole('switch', { name: /test switch/i });
    expect(switchElement).toBeChecked();
  });

  it('handles disabled state correctly', () => {
    render(<Switch label="Test Switch" disabled />);
    const switchElement = screen.getByRole('switch', { name: /test switch/i });
    const wrapper = screen.getByText('Test Switch').closest('label');
    expect(switchElement).toBeDisabled();
    expect(wrapper).toHaveClass('disabled');
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = jest.fn();
    render(<Switch label="Test Switch" onChange={handleChange} />);

    const switchElement = screen.getByRole('switch', { name: /test switch/i });
    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<Switch label="Test Switch" disabled onChange={handleChange} />);

    const switchElement = screen.getByRole('switch', { name: /test switch/i });
    fireEvent.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with description', () => {
    render(<Switch label="Test Switch" description="This is a description" />);

    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('handles error state', () => {
    render(<Switch label="Test Switch" error />);
    const track = screen.getByText('Test Switch').previousElementSibling;
    expect(track).toHaveClass('error');
  });

  it('applies custom classes', () => {
    render(<Switch label="Test Switch" className="custom-class" />);
    const wrapper = screen.getByText('Test Switch').closest('label');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('handles aria attributes correctly', () => {
    render(<Switch label="Test Switch" description="Description" error checked />);

    const switchElement = screen.getByRole('switch', { name: /test switch/i });
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    expect(switchElement).toHaveAttribute('aria-invalid', 'true');
    expect(switchElement).toHaveAttribute('aria-describedby');
  });
});
