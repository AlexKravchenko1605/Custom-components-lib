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
    checked: false,
    onChange: (e) => console.log('Switch changed:', e.target.checked),
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    helperText: 'Switch between light and dark theme',
    checked: false,
    onChange: (e) => console.log('Switch changed:', e.target.checked),
  },
};

export const Checked: Story = {
  args: {
    label: 'Remember me',
    checked: true,
    onChange: (e) => console.log('Switch changed:', e.target.checked),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
    checked: false,
    onChange: (e) => console.log('Switch changed:', e.target.checked),
  },
};

export const Error: Story = {
  args: {
    label: 'Required field',
    error: true,
    checked: false,
    onChange: (e) => console.log('Switch changed:', e.target.checked),
  },
};

export const Small: Story = {
  args: {
    label: 'Small switch',
    size: 'small',
    checked: false,
    onChange: (e) => console.log('Switch changed:', e.target.checked),
  },
};

export const Large: Story = {
  args: {
    label: 'Large switch',
    size: 'large',
    checked: false,
    onChange: (e) => console.log('Switch changed:', e.target.checked),
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

// Интерактивная версия с возможностью изменения всех параметров
export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Switch
        {...args}
        label="Interactive switch"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    color: 'primary',
    size: 'medium',
    disabled: false,
    error: false,
    helperText: '',
  },
};
