import classNames from 'classnames';
import React, { forwardRef, memo, useEffect, useCallback, useRef, useImperativeHandle } from 'react';

import { ModalProps } from './Modal.types';

import styles from './Modal.module.css';

export const Modal = memo(
  forwardRef<HTMLDialogElement, ModalProps>(
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
      const dialogRef = useRef<HTMLDialogElement>(null);
      
      useImperativeHandle(ref, () => dialogRef.current!, []);

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

      const handleClose = useCallback(() => {
        onClose();
      }, [onClose]);

      
      useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
          
          if (!dialog.open) {
            dialog.showModal();
          }
          
          
          if (preventScroll) {
            document.body.style.overflow = 'hidden';
          }
        } else {// Close the dialog
          if (dialog.open) {
            dialog.close();
          }
          
          
          if (preventScroll) {
            document.body.style.overflow = '';
          }
        }
      }, [isOpen, preventScroll]);

     
      useEffect(() => {
        if (isOpen && closeOnEscape) {
          document.addEventListener('keydown', handleEscape);
        }
        return () => {
          document.removeEventListener('keydown', handleEscape);
        };
      }, [isOpen, closeOnEscape, handleEscape]);

   
      useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleDialogClose = () => {       
          if (isOpen) {
            onClose();
          }
        };

        dialog.addEventListener('close', handleDialogClose);
        return () => {
          dialog.removeEventListener('close', handleDialogClose);
        };
      }, [isOpen, onClose]);

   
      useEffect(() => {
        return () => {
          if (preventScroll) {
            document.body.style.overflow = '';
          }
        };
      }, [preventScroll]);

      const wrapperClasses = classNames(
        styles.modal,
        {
          [styles[size]]: true,
          [styles[position]]: true,
          [styles.fullscreenOnMobile]: fullscreenOnMobile,
        },
        className,
      );

      return (
        <dialog
          ref={dialogRef}
          className={wrapperClasses}
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={footer ? 'modal-footer' : undefined}
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
                <button 
                  className={styles.closeButton} 
                  onClick={handleClose} 
                  aria-label="Close modal"
                  type="button"
                >
                  <span className={styles.closeIcon}>×</span>
                </button>
              )}
            </div>
            <div className={styles.body}>{children}</div>
            {footer && (
              <div id="modal-footer" className={styles.footer}>
                {footer}
              </div>
            )}
          </div>
        </dialog>
      );
    },
  ),
);

Modal.displayName = 'Modal';
