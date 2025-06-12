import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
  { value: '4', label: 'Option 4' },
];

export const Default: Story = {
  args: {
    options,
    value: '1',
    onChange: (value) => console.log('Selected:', value),
    label: 'Select an option',
    placeholder: 'Choose an option',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    helperText: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
};
