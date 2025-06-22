export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: SelectSize;
  className?: string;
  name?: string;
  required?: boolean;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
} 