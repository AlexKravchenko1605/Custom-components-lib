import classNames from 'classnames';
import React, { forwardRef, ChangeEvent, memo, useId } from 'react';

import { SwitchProps } from '../../types/switch';

import styles from './Switch.module.css';

export const Switch = memo(
  forwardRef<HTMLInputElement, SwitchProps>(
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

      const switchId = useId();

      const trackClassName = classNames(styles.track, {
        [styles.checked]: checked,
        [styles.disabled]: disabled,
        [styles.error]: error,
        [styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`]]: true,
      });

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
          htmlFor={switchId}
        >
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            role="switch"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className={styles.input}
            name={name}
            value={value}
            aria-checked={checked}
            aria-label={ariaLabel || label}
            aria-describedby={description ? `${switchId}-description` : undefined}
            aria-invalid={error}
            {...props}
          />
          <span className={trackClassName}>
            <span className={styles.thumb} />
          </span>
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
                id={`${switchId}-description`}
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

Switch.displayName = 'Switch';
