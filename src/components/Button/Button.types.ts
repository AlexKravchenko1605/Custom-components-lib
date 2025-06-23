import React from 'react';

export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    disabled?: boolean;
    error?: boolean;
    classes?: string;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} 