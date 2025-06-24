import classNames from 'classnames';
import React, { forwardRef, ChangeEvent, useId, useState } from 'react';

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

 
    const isControlled = checked !== undefined;
    
  
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      if (onChange) {
        onChange(e);
      }
    };
    
    
    const checkedValue = isControlled ? checked : internalChecked;

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
        [styles.checked]: checkedValue,
      },
    );

    const inputClasses = classNames(styles.input, {
      [styles.checked]: checkedValue,
      [styles.disabled]: disabled,
      [styles.error]: error,
    });

    return (
      <div className={styles.container}>
        <label className={labelClasses} htmlFor={id}>
            <input
              ref={ref}
              id={id}
              type="checkbox"
              className={inputClasses}
              checked={checkedValue}
              onChange={handleChange}
              disabled={disabled}
              name={name}
              value={value}
              aria-label={ariaLabel || label}
              {...props}
            />
          <div className={checkboxClasses}>
            {checkedValue && <span className={styles.checkmark}>✓</span>}
          </div>
          {label && <span className={styles.labelText}>{label}</span>}
        </label>
        {helperText && <p className={styles.description}>{helperText}</p>}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';


