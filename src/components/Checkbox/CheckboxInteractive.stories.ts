import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Interactive',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;


export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return React.createElement(Checkbox, {
      ...args,
      label: "Interactive checkbox",
      checked: checked,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked),
    });
  },
};

export const InteractiveWithHelperText: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return React.createElement(Checkbox, {
      ...args,
      label: "Interactive with helper text",
      helperText: "This checkbox is fully interactive",
      checked: checked,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked),
    });
  },
};

export const InteractiveSmall: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return React.createElement(Checkbox, {
      ...args,
      label: "Small interactive checkbox",
      size: "small",
      checked: checked,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked),
    });
  },
};

export const InteractiveLarge: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return React.createElement(Checkbox, {
      ...args,
      label: "Large interactive checkbox",
      size: "large",
      checked: checked,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked),
    });
  },
};

export const InteractiveError: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return React.createElement(Checkbox, {
      ...args,
      label: "Interactive error checkbox",
      error: true,
      checked: checked,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked),
    });
  },
}; 