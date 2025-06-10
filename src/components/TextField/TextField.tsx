import React from "react";
import styles from "./TextField.module.css";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeHolder?: "string";
  id: string;
  variant?: "filled" | "standard" | "outlined";
  color?: "inherit" | "warning" | "primary" | "secondary" | "success" | "error";
  disabled?: boolean;
  classes?: string;
  helperText?: string;
  onChange?: () => void;
};

const COLORS = {
  inherit: styles.colorInherit,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  warning: styles.colorWarning,
  success: styles.colorSuccess,
  error: styles.colorError,
  disabled: styles.colorDisabled,
};

const TextField: React.FC<TextFieldProps> = ({
  id = "1",
  variant = "outlined",
  color = "primary",
  disabled = false,
  placeHolder = "alex",
  label = "Name",

  helperText = "helper text",
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
    .join(" ");
  return (
    <div className={styles.inputGroup}>
      <input
        id={id}
        className={textFieldClasses}
        type='text'
        disabled={disabled}
        required
        // placeholder={placeHolder}
        onChange={onChange}
        aria-describedby={helperText}
        {...props}
      />
      <span className={styles.bar}></span>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default TextField;
