import { EnvelopeClosedIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './index';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        label: 'Label',
    }
};

export const WithIcon: Story = {
    args: {
        label: 'Search',
        placeholder: 'Fresh vegetables...',
        icon: <MagnifyingGlassIcon />,
    }
};

export const WithError: Story = {
    args: {
        label: 'Email',
        placeholder: 'mail@example.com',
        icon: <EnvelopeClosedIcon />,
        error: 'Invalid email address',
        value: 'google.com',
        onChange: () => console.log('onChange'),
    }
};
