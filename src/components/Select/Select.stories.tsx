import { EnvelopeClosedIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './index';

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large'],
            }
        },
        icon: {
            control: false,
        },
        label: {
            control: {
                type: 'text'
            },
        }
    }
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
        label: 'Label',
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ]
    }
};

export const WithIcon: Story = {
    args: {
        label: 'Search',
        placeholder: 'Fresh vegetables...',
        icon: <MagnifyingGlassIcon />,
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ]
    }
};

export const WithError: Story = {
    args: {
        label: 'Option',
        icon: <EnvelopeClosedIcon />,
        error: 'Invalid option',
        value: '1',
        onChange: () => console.log('onChange'),
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ]
    }
};
