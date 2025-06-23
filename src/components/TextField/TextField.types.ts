export type TextFieldVariant = 'filled' | 'standard' | 'outlined';
export type TextFieldColor = 'inherit' | 'warning' | 'primary' | 'secondary' | 'success' | 'error';

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    placeHolder?: string;
    id?: string;
    variant?: TextFieldVariant;
    color?: TextFieldColor;
    disabled?: boolean;
    error?: boolean;
    classes?: string;
    helperText?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }; 