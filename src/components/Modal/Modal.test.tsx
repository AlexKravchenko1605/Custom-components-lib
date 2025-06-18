import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import { Modal } from './Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} showCloseButton={true}>
        <div>Modal Content</div>
      </Modal>,
    );

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnOverlayClick={true}>
        <div>Modal Content</div>
      </Modal>,
    );

    const overlay = screen.getByRole('dialog').firstChild;
    if (overlay) fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when content is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const content = screen.getByText('Modal Content');
    fireEvent.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnEscape={true}>
        <div>Modal Content</div>
      </Modal>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} size="small">
        <div>Modal Content</div>
      </Modal>,
    );

    let modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('small');

    rerender(
      <Modal isOpen={true} onClose={mockOnClose} size="large">
        <div>Modal Content</div>
      </Modal>,
    );

    modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('large');
  });

  it('renders with footer', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} footer={<div>Footer Content</div>}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('applies custom classes', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        className="custom-modal"
        contentClassName="custom-content"
        overlayClassName="custom-overlay"
      >
        <div>Modal Content</div>
      </Modal>,
    );

    const modal = screen.getByRole('dialog');
    const content = modal.querySelector('.custom-content');
    const overlay = modal.querySelector('.custom-overlay');

    expect(modal).toHaveClass('custom-modal');
    expect(content).toHaveClass('custom-content');
    expect(overlay).toHaveClass('custom-overlay');
  });

  it('prevents body scroll when modal is open', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} preventScroll={true}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when modal is closed', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={mockOnClose} preventScroll={true}>
        <div>Modal Content</div>
      </Modal>,
    );

    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
