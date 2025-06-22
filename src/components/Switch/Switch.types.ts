import { ChangeEvent } from 'react';

export type SwitchSize = 'small' | 'medium' | 'large';
export type SwitchColor = 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  size?: SwitchSize;
  color?: SwitchColor;
  'aria-label'?: string;
  label?: string;
  description?: string;
  name?: string;
  value?: string | number;
} 