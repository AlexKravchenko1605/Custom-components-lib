import classNames from 'classnames';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { SelectProps, SelectOption } from './Select.types';

import styles from './Select.module.css';

export const Select: React.FC<SelectProps> = ({
  options = [],
  value,
  onChange,
  defaultValue,
  label,
  placeholder,
  disabled = false,
  error = false,
  helperText,
  fullWidth = false,
  size = 'medium',
  className,
  name,
  required = false,
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {

  const isControlled = value !== undefined;
  
  
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  
  
  const currentValue = isControlled ? value : internalValue;
  
  
  const updateValue = useCallback((newValue: string | number | undefined) => {
    if (!disabled) {
      if (isControlled) {
       
        onChange?.(newValue);
      } else {
        
        setInternalValue(newValue);
        onChange?.(newValue);
      }
    }
  }, [disabled, isControlled, onChange]);

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);


  const availableOptions = options.filter(option => !option.disabled);

  
  const selectedOption = options.find(option => option.value === currentValue);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

 
  useEffect(() => {
    setFocusedIndex(-1);
  }, [options]);

  const handleSelect = useCallback((optionValue: string | number | undefined) => {
    if (!disabled) {
      updateValue(optionValue);
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  }, [disabled, updateValue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) {
          if (focusedIndex >= 0 && focusedIndex < availableOptions.length) {
            handleSelect(availableOptions[focusedIndex].value);
          }
        } else {
          setIsOpen(true);
          setFocusedIndex(0);
        }
        break;
      
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => 
            prev < availableOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(availableOptions.length - 1);
        } else {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : availableOptions.length - 1
          );
        }
        break;
      
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  }, [disabled, isOpen, focusedIndex, availableOptions, handleSelect]);

  
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsRef.current) {
      const optionElements = optionsRef.current.querySelectorAll('[role="option"]');
      const focusedElement = optionElements[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, focusedIndex]);

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

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setFocusedIndex(0);
      } else {
        setFocusedIndex(-1);
      }
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    if (!option.disabled) {
      handleSelect(option.value);
    }
  };

  const handleOptionMouseEnter = (index: number) => {
    setFocusedIndex(index);
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
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedBy}
        aria-required={required}
        aria-invalid={error}
      >
        <span className={styles.selectText}>
          <span className={!selectedOption ? styles.placeholder : ''}>
            {selectedOption ? selectedOption.label : (placeholder || 'Select an option')}
          </span>
        </span>
        <div className={styles.selectIcon}>
          <svg
            className={arrowClasses}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
      </div>
      {isOpen && (
        <div 
          className={styles.options} 
          ref={optionsRef}
          role="listbox"
          aria-label={ariaLabel || label}
        >
          {options.length === 0 ? (
            <div className={styles.noOptions}>No options available</div>
          ) : (
            options.map((option: SelectOption, index: number) => {
              const isFocused = availableOptions.findIndex(opt => opt.value === option.value) === focusedIndex;
              return (
                <div
                  key={option.value}
                  className={classNames(styles.option, {
                    [styles.selected]: option.value === currentValue,
                    [styles.disabled]: option.disabled,
                    [styles.focused]: isFocused,
                  })}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => handleOptionMouseEnter(availableOptions.findIndex(opt => opt.value === option.value))}
                  role="option"
                  aria-selected={option.value === currentValue}
                  aria-disabled={option.disabled}
                >
                  {option.label}
                </div>
              );
            })
          )}
        </div>
      )}
      {helperText && (
        <div className={classNames(styles.helperText, { [styles.error]: error })}>{helperText}</div>
      )}
      <input 
        type="hidden" 
        name={name} 
        value={currentValue || ''} 
        required={required} 
        id={id} 
      />
    </div>
  );
};
