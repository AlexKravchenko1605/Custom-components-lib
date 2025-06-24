import classNames from 'classnames';
import React, { forwardRef, ChangeEvent, useId } from 'react';

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

    const wrapperClasses = classNames(
      styles.wrapper,
      styles[size],
      {
        [styles.disabled]: disabled,
      },
      className,
    );

    const trackClasses = classNames(styles.track, {
      [styles.checked]: checked,
      [styles.disabled]: disabled,
      [styles.error]: error,
      [styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`]]: true,
    });

    const thumbClasses = classNames(styles.thumb, {
      [styles.checked]: checked,
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
            {...(checked !== undefined ? { checked } : {})}
            {...(defaultChecked !== undefined ? { defaultChecked } : {})}
            onChange={onChange}
            disabled={disabled}
            name={name}
            value={value}
            role="switch"
            aria-checked={checked}
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
