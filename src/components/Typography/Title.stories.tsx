import type { Meta, StoryObj } from '@storybook/react';

import { Title } from './index';

const meta: Meta<typeof Title> = {
    title: 'Components/Title',
    component: Title,
    argTypes: {
        children: {
            control: {
                type: 'text'
            },
        },
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large'],
            },
        }
    }
};

export default meta;
type Story = StoryObj<typeof Title>;


export const Default: Story = {
    args: {
        children: 'Hello world',
    },
};
