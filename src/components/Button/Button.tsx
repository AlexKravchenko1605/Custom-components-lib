import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  classes?: string;
  children?: React.ReactNode;
  onClick?: (event: any) => void;
}

const COLORS = {
  inherit: styles.colorInherit,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  success: styles.colorSuccess,
  error: styles.colorError,
  disabled: styles.colorDisabled,
};

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  classes,
  children,
  onClick,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    COLORS[color],
    styles[size],
    disabled && COLORS.disabled,
    classes,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
