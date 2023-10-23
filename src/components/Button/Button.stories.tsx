import { HeartFilledIcon } from '@radix-ui/react-icons';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './index';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large'],
            }
        },
        icon: {
            control: false,
        }
    }
};

export default meta;
type Story = StoryObj<typeof Button>;


export const Default: Story = {
    args: {
        children: 'Button',
        icon: <HeartFilledIcon />,
    },
};
