import React from 'react';

import styles from './TextField.module.css';

import type{ TextFieldProps } from './TextField.types';

const COLORS = {
  inherit: styles.colorInherit,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  warning: styles.colorWarning,
  success: styles.colorSuccess,
  error: styles.colorError,
  disabled: styles.colorDisabled,
};

export const TextField: React.FC<TextFieldProps> = ({
  id ,
  variant = 'outlined',
  color = 'primary',
  disabled = false,
  placeHolder,
  label ,
  helperText,
  onChange,
  classes,
  ...props
}) => {
  const textFieldClasses = [
    styles.input,
    styles[variant],
    COLORS[color],
    disabled && COLORS.disabled,
    classes,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={styles.inputGroup}>
      <input
        id={id || ''}
        className={textFieldClasses}
        type="text"
        disabled={disabled}
        required
        placeholder={placeHolder || ''}
        onChange={onChange}
        {...props}
      />
      <span className={styles.bar}></span>
      {helperText && <span className={styles.helperText}>{helperText}</span>}
      { label && <label htmlFor={id || ''} className={styles.label}>
        {label || ''  }
      </label>}
    </div>
  );
};
