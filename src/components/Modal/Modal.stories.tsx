import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Button } from '../Button/Button';

import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal component using native dialog element for better accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description: 'Controls whether the modal is visible',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onClose: {
      description: 'Callback fired when the modal is closed',
      action: 'closed',
    },
    title: {
      description: 'Title text displayed in the modal header',
      control: 'text',
    },
    size: {
      description: 'Size variant of the modal',
      control: 'select',
      options: ['small', 'medium', 'large', 'fullscreen'],
      table: {
        type: { summary: 'ModalSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    position: {
      description: 'Position of the modal on the screen',
      control: 'select',
      options: ['center', 'top', 'bottom'],
      table: {
        type: { summary: 'ModalPosition' },
        defaultValue: { summary: 'center' },
      },
    },
    showCloseButton: {
      description: 'Whether to show the close button in the header',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closeOnOverlayClick: {
      description: 'Whether to close the modal when clicking the overlay',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closeOnEscape: {
      description: 'Whether to close the modal when pressing the Escape key',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    showOverlay: {
      description: 'Whether to show the overlay behind the modal',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    fullscreenOnMobile: {
      description: 'Whether to display the modal in fullscreen on mobile devices',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    preventScroll: {
      description: 'Whether to prevent body scrolling when modal is open',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

// Компонент-обертка для отображения модального окна с кнопкой
const ModalWrapper = ({ children, ...modalProps }: React.ComponentProps<typeof Modal> & { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal
        {...modalProps}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This is the modal content using native dialog element.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Modal Title',
  },
};

export const WithFooter: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This modal has a footer with action buttons.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Modal with Footer',
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button color="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => {}}>
          Confirm
        </Button>
      </div>
    ),
  },
};

export const WithAccessibility: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div>
        <p>This modal has enhanced accessibility features:</p>
        <ul>
          <li>Uses native dialog element</li>
          <li>Proper ARIA attributes</li>
          <li>Keyboard navigation support</li>
          <li>Screen reader friendly</li>
          <li>Focus trap implementation</li>
        </ul>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Accessible Modal',
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button color="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => {}}>
          Accept
        </Button>
      </div>
    ),
  },
};

export const Small: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This is a small modal.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Small Modal',
    size: 'small',
  },
};

export const Large: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This is a large modal with more content.</p>
      <p>It can accommodate more information and larger forms.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Large Modal',
    size: 'large',
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This modal doesn't have a close button in the header.</p>
      <p>You can only close it by clicking the overlay or pressing Escape.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Modal without Close Button',
    showCloseButton: false,
  },
};

export const WithoutOverlay: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This modal doesn't have an overlay.</p>
      <p>You can see the background content behind it.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Modal without Overlay',
    showOverlay: false,
  },
};

export const WithForm: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" rows={4} style={{ width: '100%', padding: '8px' }} />
        </div>
      </form>
    </ModalWrapper>
  ),
  args: {
    title: 'Modal with Form',
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button color="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => {}}>
          Submit
        </Button>
      </div>
    ),
  },
};

export const LongContent: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div>
        <p>This modal contains a lot of content to demonstrate scrolling behavior.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Modal with Long Content',
  },
}; 