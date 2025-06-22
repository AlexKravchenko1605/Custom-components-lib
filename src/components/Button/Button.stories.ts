import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const small: Story = {
  args: {
    size: 'small',
    children: 'Кнопка',
  },
};

export const withHtmlAttributes: Story = {
  args: {
    children: 'Кнопка с HTML атрибутами',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    // HTML атрибуты
    type: 'submit',
    name: 'submit-button',
    form: 'test-form',
    value: 'submit-value',
    'aria-label': 'Submit form button',
    title: 'This is a submit button',
  },
};

export const withDataAttributes: Story = {
  args: {
    children: 'Кнопка с data атрибутами',
    variant: 'outlined',
    color: 'secondary',
    size: 'large',
    // Data атрибуты
    'data-testid': 'custom-button',
    'data-action': 'save',
    'data-user-id': '123',
  } as any, // Используем any для демонстрации data атрибутов
};
