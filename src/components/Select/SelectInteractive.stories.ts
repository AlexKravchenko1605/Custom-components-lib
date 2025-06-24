import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Interactive',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string | number | undefined>(undefined);
    return React.createElement(Select, {
      ...args,
      value: value,
      onChange: (newValue: string | number | undefined) => setValue(newValue),
      label: "Interactive Select",
      placeholder: "Choose an option",
    });
  },
  args: {
    options: [
      { value: '1', label: 'Apple' },
      { value: '2', label: 'Banana' },
      { value: '3', label: 'Orange' },
      { value: '4', label: 'Grape' },
      { value: '5', label: 'Mango' },
      { value: '6', label: 'Pineapple', disabled: true },
    ],
    size: 'medium',
    fullWidth: false,
    disabled: false,
    error: false,
    helperText: '',
  },
};

export const InteractiveWithCategories: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string | number | undefined>(undefined);
    return React.createElement(Select, {
      ...args,
      value: value,
      onChange: (newValue: string | number | undefined) => setValue(newValue),
      label: "Choose your favorite fruit",
      placeholder: "Select a fruit",
    });
  },
  args: {
    options: [
      { value: 'apple', label: '🍎 Apple' },
      { value: 'banana', label: '🍌 Banana' },
      { value: 'orange', label: '🍊 Orange' },
      { value: 'grape', label: '🍇 Grape' },
      { value: 'mango', label: '🥭 Mango' },
      { value: 'pineapple', label: '🍍 Pineapple', disabled: true },
      { value: 'strawberry', label: '🍓 Strawberry' },
      { value: 'blueberry', label: '🫐 Blueberry' },
    ],
    size: 'medium',
    fullWidth: false,
    disabled: false,
    error: false,
    helperText: 'Select your favorite fruit from the list',
  },
}; 