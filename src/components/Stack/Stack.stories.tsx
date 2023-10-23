import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Input } from '../Input';

import { Stack } from './index';

const meta: Meta<typeof Stack> = {
    title: 'Components/Stack',
    component: Stack,
    argTypes: {
        children: {
            control: false,
        }
    }
};

export default meta;
type Story = StoryObj<typeof Stack>;


export const Default: Story = {
    args: {
        gap: 2,
        children: (
            <>
                <Input icon={<MagnifyingGlassIcon />} />
                <Button variant="primary">Search</Button>
            </>
        ),
    },
};
