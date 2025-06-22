import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options to display',
    },
    value: {
      control: 'text',
      description: 'Selected value (can be undefined)',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
    },
    label: {
      control: 'text',
      description: 'Label text for the select',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the select is in an error state',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the select',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the select should take full width',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the select',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label',
    },
    'aria-describedby': {
      control: 'text',
      description: 'ID of element that describes the select',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
  { value: '4', label: 'Option 4' },
];

const manyOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `${i + 1}`,
  label: `Option ${i + 1}`,
}));

export const Default: Story = {
  args: {
    options,
    value: '1',
    onChange: () => {},
    label: 'Select an option',
    placeholder: 'Choose an option',
  },
};

export const WithUndefinedValue: Story = {
  args: {
    options,
    value: undefined,
    onChange: () => {},
    label: 'Select an option',
    placeholder: 'Choose an option',
  },
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    value: undefined,
    onChange: () => {},
    label: 'No options available',
    placeholder: 'No options to choose from',
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

export const WithAccessibility: Story = {
  args: {
    ...Default.args,
    'aria-label': 'Country selection',
    'aria-describedby': 'country-help',
    helperText: 'Select your country of residence',
  },
};

export const ManyOptions: Story = {
  args: {
    options: manyOptions,
    value: '5',
    onChange: () => {},
    label: 'Select from many options',
    placeholder: 'Choose an option',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2', disabled: true },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4', disabled: true },
      { value: '5', label: 'Option 5' },
    ],
    value: '1',
    onChange: () => {},
    label: 'Select with disabled options',
    placeholder: 'Choose an option',
  },
};
