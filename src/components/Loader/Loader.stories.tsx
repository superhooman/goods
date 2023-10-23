import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './index';

const meta: Meta<typeof Loader> = {
    title: 'Components/Loader',
    component: Loader,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large'],
            }
        },
    }
};

export default meta;
type Story = StoryObj<typeof Loader>;


export const Default: Story = {};
