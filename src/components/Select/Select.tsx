import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';

import { SelectProps, SelectOption } from '../../types/select';

import styles from './Select.module.css';

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  helperText,
  fullWidth = false,
  size = 'medium',
  className,
  name,
  required = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option: SelectOption) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string | number) => {
    if (!disabled) {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const wrapperClasses = classNames(
    styles.selectWrapper,
    {
      [styles.fullWidth]: fullWidth,
      [styles[size]]: size,
    },
    className,
  );

  const selectClasses = classNames(styles.select, {
    [styles.disabled]: disabled,
    [styles.error]: error,
  });

  const arrowClasses = classNames(styles.arrow, {
    [styles.open]: isOpen,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    }
  };

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span style={{ color: 'var(--error-color)' }}> *</span>}
        </label>
      )}
      <div
        className={selectClasses}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <span className={!selectedOption ? styles.placeholder : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={arrowClasses}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option: SelectOption) => (
            <div
              key={option.value}
              className={classNames(styles.option, {
                [styles.selected]: option.value === value,
                [styles.disabled]: option.disabled,
              })}
              onClick={() => !option.disabled && handleSelect(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {helperText && (
        <div className={classNames(styles.helperText, { [styles.error]: error })}>{helperText}</div>
      )}
      <input type="hidden" name={name} value={value} required={required} id={id} />
    </div>
  );
};
