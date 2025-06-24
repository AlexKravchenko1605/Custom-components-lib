import classNames from 'classnames';
import React, { forwardRef, useEffect, useCallback, useRef, useImperativeHandle } from 'react';

import { ModalProps } from './Modal.types';

import styles from './Modal.module.css';

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
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
    const contentRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    
    useImperativeHandle(ref, () => dialogRef.current!, []);

    
    const getFocusableElements = useCallback(() => {
      if (!contentRef.current) return [];
      
      return Array.from(
        contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
        )
      ).filter((el) => {
        const element = el as HTMLElement;
        const formElement = element as HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        return !('disabled' in formElement && formElement.disabled) && element.offsetParent !== null;
      }) as HTMLElement[];
    }, []);

    
    const focusFirstElement = useCallback(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, [getFocusableElements]);

    
    const focusLastElement = useCallback(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[focusableElements.length - 1].focus();
      }
    }, [getFocusableElements]);

   
    const handleTabKey = useCallback((event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
   
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }, [getFocusableElements]);

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
      if (isOpen) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        
        
        const timer = setTimeout(() => {
          focusFirstElement();
        }, 0);
        
        return () => clearTimeout(timer);
      }
    }, [isOpen, focusFirstElement]);

    
    useEffect(() => {
      if (!isOpen && previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
    }, [isOpen]);

    
    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleTabKey);
        return () => {
          document.removeEventListener('keydown', handleTabKey);
        };
      }
    }, [isOpen, handleTabKey]);

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (isOpen) {
        dialog.showModal();
        
        if (preventScroll) {
          document.body.style.overflow = 'hidden';
        }
      } else {
        dialog.close();
      }

      return () => {
        if (preventScroll) {
          document.body.style.overflow = '';
        }
      };
    }, [isOpen, preventScroll]);

    useEffect(() => {
      if (closeOnEscape) {
        document.addEventListener('keydown', handleEscape);
      }
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [closeOnEscape, handleEscape]);

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const handleDialogClose = () => {
        onClose();
      };

      dialog.addEventListener('close', handleDialogClose);
      return () => {
        dialog.removeEventListener('close', handleDialogClose);
      };
    }, [onClose]);

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

    return isOpen ? (
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
          ref={contentRef}
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
    ) : null;
  },
);

Modal.displayName = 'Modal';
