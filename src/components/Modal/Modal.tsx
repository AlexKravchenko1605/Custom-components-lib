import classNames from 'classnames';
import React, { forwardRef, memo, useEffect, useCallback } from 'react';

import { ModalProps } from '../../types/modal';

import styles from './Modal.module.css';

export const Modal = memo(
  forwardRef<HTMLDivElement, ModalProps>(
    (
      {
        isOpen,
        onClose,
        title,
        children,
        showCloseButton = true,
        closeOnOverlayClick = true,
        closeOnEscape = true,
        size = 'medium',
        position = 'center',
        className,
        contentClassName,
        overlayClassName,
        showOverlay = true,
        fullscreenOnMobile = true,
        footer,
        preventScroll = true,
      },
      ref,
    ) => {
      const handleEscape = useCallback(
        (event: KeyboardEvent) => {
          if (event.key === 'Escape' && closeOnEscape) {
            onClose();
          }
        },
        [closeOnEscape, onClose],
      );

      const handleOverlayClick = useCallback(
        (event: React.MouseEvent) => {
          if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
          }
        },
        [closeOnOverlayClick, onClose],
      );

      useEffect(() => {
        if (isOpen && preventScroll) {
          document.body.style.overflow = 'hidden';
        }
        return () => {
          document.body.style.overflow = '';
        };
      }, [isOpen, preventScroll]);

      useEffect(() => {
        if (isOpen) {
          document.addEventListener('keydown', handleEscape);
        }
        return () => {
          document.removeEventListener('keydown', handleEscape);
        };
      }, [isOpen, handleEscape]);

      if (!isOpen) return null;

      return (
        <div
          ref={ref}
          className={classNames(
            styles.modal,
            {
              [styles.open]: isOpen,
              [styles[size]]: true,
              [styles[position]]: true,
              [styles.fullscreenOnMobile]: fullscreenOnMobile,
            },
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {showOverlay && (
            <div
              className={classNames(styles.overlay, overlayClassName)}
              onClick={handleOverlayClick}
            />
          )}
          <div
            className={classNames(styles.content, contentClassName)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              {title && (
                <h2 id="modal-title" className={styles.title}>
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                  <span className={styles.closeIcon}>×</span>
                </button>
              )}
            </div>
            <div className={styles.body}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
          </div>
        </div>
      );
    },
  ),
);

Modal.displayName = 'Modal';
