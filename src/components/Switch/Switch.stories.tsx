import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text for the switch',
    },
    helperText: {
      control: 'text',
      description: 'Description text below the label',
    },
    error: {
      control: 'boolean',
      description: 'Whether the switch is in an error state',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the switch',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'success', 'info'],
      description: 'Color variant of the switch',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    helperText: 'Switch between light and dark theme',
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
    label: 'Disabled switch',
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
    label: 'Small switch',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large switch',
    size: 'large',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Primary color" color="primary" checked />
      <Switch label="Secondary color" color="secondary" checked />
      <Switch label="Error color" color="error" checked />
      <Switch label="Success color" color="success" checked />
      <Switch label="Info color" color="info" checked />
    </div>
  ),
};
