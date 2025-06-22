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
    'aria-label': {
      description: 'Accessibility label for the modal',
      control: 'text',
    },
    'aria-describedby': {
      description: 'ID of element that describes the modal',
      control: 'text',
    },
    'aria-labelledby': {
      description: 'ID of element that labels the modal',
      control: 'text',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

// Basic usage
const DefaultModalStory = (args: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false);
  return <Modal {...args} isOpen={open} onClose={() => setOpen(false)} />;
};

export const Default = {
  args: {
    title: 'Modal Title',
    children: <p>This is the modal content using native dialog element.</p>,
  },
  render: (args: React.ComponentProps<typeof Modal>) => <DefaultModalStory {...args} />,
};

// With footer
export const WithFooter: Story = {
  args: {
    title: 'Modal with Footer',
    children: <p>This modal has a footer with action buttons.</p>,
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
  render: (args: React.ComponentProps<typeof Modal>) => <DefaultModalStory {...args} />,
};

// With accessibility
export const WithAccessibility: Story = {
  args: {
    title: 'Accessible Modal',
    children: (
      <div>
        <p>This modal has enhanced accessibility features:</p>
        <ul>
          <li>Uses native dialog element</li>
          <li>Proper ARIA attributes</li>
          <li>Keyboard navigation support</li>
          <li>Screen reader friendly</li>
        </ul>
      </div>
    ),
    'aria-label': 'Accessibility demonstration modal',
    'aria-describedby': 'modal-description',
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
  render: (args: React.ComponentProps<typeof Modal>) => <DefaultModalStory {...args} />,
};

const SizesStoryComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large' | 'fullscreen'>('medium');

  return (
    <>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <Button
          onClick={() => {
            setSize('small');
            setIsOpen(true);
          }}
        >
          Small
        </Button>
        <Button
          onClick={() => {
            setSize('medium');
            setIsOpen(true);
          }}
        >
          Medium
        </Button>
        <Button
          onClick={() => {
            setSize('large');
            setIsOpen(true);
          }}
        >
          Large
        </Button>
        <Button
          onClick={() => {
            setSize('fullscreen');
            setIsOpen(true);
          }}
        >
          Fullscreen
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
        size={size}
      >
        <p>This is a {size} modal using native dialog element.</p>
      </Modal>
    </>
  );
};

export const Sizes: Story = {
  render: () => <SizesStoryComponent />,
};

const PositionsStoryComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'center' | 'top' | 'bottom'>('center');

  return (
    <>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <Button
          onClick={() => {
            setPosition('center');
            setIsOpen(true);
          }}
        >
          Center
        </Button>
        <Button
          onClick={() => {
            setPosition('top');
            setIsOpen(true);
          }}
        >
          Top
        </Button>
        <Button
          onClick={() => {
            setPosition('bottom');
            setIsOpen(true);
          }}
        >
          Bottom
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${position.charAt(0).toUpperCase() + position.slice(1)} Position Modal`}
        position={position}
      >
        <p>This modal is positioned at the {position}.</p>
      </Modal>
    </>
  );
};

export const Positions: Story = {
  render: () => <PositionsStoryComponent />,
};

// Without close button
export const WithoutCloseButton: Story = {
  args: {
    title: 'Modal without Close Button',
    children: <p>This modal doesn't have a close button. Use Escape key or click outside to close.</p>,
    showCloseButton: false,
  },
  render: (args: React.ComponentProps<typeof Modal>) => <DefaultModalStory {...args} />,
};

// Without overlay
export const WithoutOverlay: Story = {
  args: {
    title: 'Modal without Overlay',
    children: <p>This modal doesn't have an overlay background.</p>,
    showOverlay: false,
  },
  render: (args: React.ComponentProps<typeof Modal>) => <DefaultModalStory {...args} />,
};

// Long content
export const LongContent: Story = {
  args: {
    title: 'Modal with Long Content',
    children: (
      <div>
        <p>This modal contains a lot of content to demonstrate scrolling behavior.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    ),
  },
  render: (args: React.ComponentProps<typeof Modal>) => <DefaultModalStory {...args} />,
};
