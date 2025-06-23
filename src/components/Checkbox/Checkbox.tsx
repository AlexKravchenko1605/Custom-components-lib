import classNames from 'classnames';
import React, { forwardRef, ChangeEvent, useId } from 'react';

import { CheckboxProps } from './Checkbox.types';

import styles from './Checkbox.module.css';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      label,
      helperText,
      error = false,
      className,
      name,
      value,
      size = 'medium',
      color = 'primary',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    const labelClasses = classNames(
      styles.label,
      styles[size],
      styles[color],
      {
        [styles.disabled]: disabled,
        [styles.error]: error,
      },
      className,
    );

    const checkboxClasses = classNames(
      styles.checkbox,
      {
        [styles.checked]: checked,
      },
    );

    const inputClasses = classNames(styles.input, {
      [styles.checked]: checked,
      [styles.disabled]: disabled,
      [styles.error]: error,
    });

    
    const isChecked = checked !== undefined ? checked : undefined;

    return (
      <div className={styles.container}>
        <label className={labelClasses} htmlFor={id}>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={inputClasses}
            {...(checked !== undefined ? { checked } : {})}
            {...(defaultChecked !== undefined ? { defaultChecked } : {})}
            onChange={onChange}
            disabled={disabled}
            name={name}
            value={value}
            aria-label={ariaLabel || label}
            {...props}
          />
          <div className={checkboxClasses}>
            {(checked !== undefined ? checked : undefined) && <span className={styles.checkmark}>✓</span>}
          </div>
          {label && <span className={styles.labelText}>{label}</span>}
        </label>
        {helperText && <p className={styles.description}>{helperText}</p>}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
