import classNames from 'classnames';
import React, { forwardRef, ChangeEvent, useId, useState } from 'react';

import { SwitchProps } from './Switch.types';

import styles from './Switch.module.css';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      error = false,
      className,
      size = 'medium',
      color = 'primary',
      'aria-label': ariaLabel,
      label,
      helperText,
      name,
      value,
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

    const wrapperClasses = classNames(
      styles.wrapper,
      styles[size],
      {
        [styles.disabled]: disabled,
      },
      className,
    );

    const trackClasses = classNames(styles.track, {
      [styles.checked]: checkedValue,
      [styles.disabled]: disabled,
      [styles.error]: error,
      [styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`]]: true,
    });

    const thumbClasses = classNames(styles.thumb, {
      [styles.checked]: checkedValue,
      [styles.disabled]: disabled,
    });

    return (
      <div className={styles.container}>
        <label className={wrapperClasses} htmlFor={id}>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={styles.input}
            checked={checkedValue}
            onChange={handleChange}
            disabled={disabled}
            name={name}
            value={value}
            role="switch"
            aria-checked={checkedValue}
            aria-invalid={error}
            aria-label={ariaLabel || label}
            {...props}
          />
          <div className={trackClasses}>
            <div className={thumbClasses} />
          </div>
          <div className={styles.content}>
            {label && <span className={styles.label}>{label}</span>}
          </div>
        </label>
            {helperText && <span className={styles.description}>{helperText}</span>}
      </div>
    );
  },
);

Switch.displayName = 'Switch';
