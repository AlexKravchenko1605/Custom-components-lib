import classNames from 'classnames';
import React, { forwardRef, ChangeEvent, memo, useId } from 'react';

import { CheckboxProps } from './Checkbox.types';

import styles from './Checkbox.module.css';

export const Checkbox = memo(
  forwardRef<HTMLInputElement, CheckboxProps>(
    (
      {
        checked = false,
        onChange,
        disabled = false,
        label,
        description,
        error,
        className,
        size = 'medium',
        color = 'primary',
        name,
        value,
        'aria-label': ariaLabel,
        ...props
      },
      ref,
    ) => {
      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        onChange?.(event);
      };

      const checkboxId = useId();

      return (
        <label
          className={classNames(
            styles.wrapper,
            {
              [styles.disabled]: disabled,
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
            },
            className,
          )}
          htmlFor={checkboxId}
        >
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className={styles.input}
            name={name}
            value={value}
            aria-label={ariaLabel || label}
            aria-describedby={description ? `${checkboxId}-description` : undefined}
            aria-invalid={error}
            {...props}
          />
          <span
            className={classNames(styles.icon, {
              [styles.checked]: checked,
              [styles.disabled]: disabled,
              [styles.error]: error,
              [styles.colorError]: color === 'error',
              [styles.colorSuccess]: color === 'success',
              [styles.colorInfo]: color === 'info',
              [styles.colorPrimary]: color === 'primary',
              [styles.colorSecondary]: color === 'secondary',
            })}
            aria-hidden="true"
          />
          <div className={styles.content}>
            {label && (
              <span
                className={classNames(styles.label, {
                  [styles.disabled]: disabled,
                })}
              >
                {label}
              </span>
            )}
            {description && (
              <span
                id={`${checkboxId}-description`}
                className={classNames(styles.description, {
                  [styles.disabled]: disabled,
                })}
              >
                {description}
              </span>
            )}
          </div>
        </label>
      );
    },
  ),
);

Checkbox.displayName = 'Checkbox';
