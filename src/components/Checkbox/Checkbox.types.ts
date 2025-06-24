import React, { ChangeEvent } from 'react';

export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxColor = 'primary' | 'secondary' | 'error' | 'success' | 'info';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; 
  disabled?: boolean; 
  label?: string; 
  helperText?: string; 
  error?: boolean;
  className?: string; 
  name?: string;  
  value?: string | number;  
  size?: CheckboxSize; 
  color?: CheckboxColor;
  'aria-label'?: string;
} 