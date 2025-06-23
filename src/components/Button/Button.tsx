import React from 'react';

import styles from './Button.module.css';

import { ButtonProps } from './Button.types';

const COLORS = {
  inherit: styles.colorInherit,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  success: styles.colorSuccess,
  error: styles.colorError,
  disabled: styles.colorDisabled,
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  error = false,
  classes,
  children,
  onClick,
  className,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    COLORS[color],
    styles[size],
    disabled && COLORS.disabled,
    error && styles.error,
    classes,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled} 
      onClick={onClick} 
      {...props}
    >
      {children}
    </button>
  );
};
