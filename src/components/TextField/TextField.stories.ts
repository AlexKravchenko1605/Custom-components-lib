import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'standard', 'outlined'],
      description: 'Variant of the text field',
    },
    color: {
      control: 'select',
      options: ['inherit', 'warning', 'primary', 'secondary', 'success', 'error'],
      description: 'Color variant of the text field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the text field is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the text field is in an error state',
    },
    label: {
      control: 'text',
      description: 'Label text for the text field',
    },
    placeHolder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
    id: {
      control: 'text',
      description: 'Unique identifier for the input',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined TextField',
    placeHolder: 'Enter text here',
  },
};

export const filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled TextField',
    placeHolder: 'Enter text here',
  },
};

export const standard: Story = {
  args: {
    variant: 'standard',
    label: 'Standard TextField',
    placeHolder: 'Enter text here',
  },
};

export const withColors: Story = {
  args: {
    variant: 'outlined',
    label: 'TextField with different colors',
    placeHolder: 'Try different colors',
    color: 'primary',
  },
};

export const withHelperText: Story = {
  args: {
    variant: 'outlined',
    label: 'TextField with helper text',
    placeHolder: 'Enter your email',
    helperText: 'We will never share your email with anyone else.',
    color: 'primary',
  },
};

export const disabled: Story = {
  args: {
    variant: 'outlined',
    label: 'Disabled TextField',
    placeHolder: 'This field is disabled',
    disabled: true,
  },
};

export const error: Story = {
  args: {
    variant: 'outlined',
    label: 'Error TextField',
    placeHolder: 'Enter text here',
    color: 'error',
    error: true,
    helperText: 'This field is required',
  },
};

export const withErrorState: Story = {
  args: {
    variant: 'outlined',
    label: 'TextField with error state',
    placeHolder: 'Enter text here',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};
