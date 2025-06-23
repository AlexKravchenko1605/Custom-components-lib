import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Description text below the label',
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox is in an error state',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the checkbox',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'success', 'info'],
      description: 'Color variant of the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'Receive updates about new features and releases',
  },
};

export const Checked: Story = {
  args: {
    label: 'Remember me',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Required field',
    error: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small checkbox',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large checkbox',
    size: 'large',
  },
};

export const WithHtmlAttributes: Story = {
  args: {
    label: 'Checkbox with HTML attributes',    
    name: 'preferences',
    value: 'newsletter',
    required: true,
    'aria-describedby': 'checkbox-help',
    title: 'Subscribe to our newsletter',
    form: 'user-form',
  },
};




