import React from 'react';

import styles from './TextField.module.css';

import type{ TextFieldProps } from './TextField.types';

const COLORS = {
  inherit: styles.colorInherit,
  warning: styles.colorWarning,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  success: styles.colorSuccess,
  error: styles.colorError,
};

export const TextField: React.FC<TextFieldProps> = ({
  label,
  placeHolder,
  id,
  variant = 'outlined',
  color = 'primary',
  disabled = false,
  error = false,
  classes,
  helperText,
  onChange,
  className,
  ...props
}) => {
  const textFieldClasses = [
    styles.textField,
    styles[variant],
    COLORS[color],
    disabled && styles.disabled,
    error && styles.error,
    classes,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={textFieldClasses}
        placeholder={placeHolder}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error}
        {...props}
      />
      {helperText && (
        <p className={`${styles.helperText} ${error ? styles.error : ''}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};
