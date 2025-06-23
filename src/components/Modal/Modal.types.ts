export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';
export type ModalPosition = 'center' | 'top' | 'bottom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: ModalSize;
  position?: ModalPosition;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  showOverlay?: boolean;
  fullscreenOnMobile?: boolean;
  footer?: React.ReactNode;
  preventScroll?: boolean; 
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
} 