import type { Meta, StoryObj } from '@storybook/react';

import { ImageUploader } from './index';

const meta: Meta<typeof ImageUploader> = {
    title: 'Components/ImageUploader',
    component: ImageUploader,
};

export default meta;
type Story = StoryObj<typeof ImageUploader>;

export const Default: Story = {};

export const Loading: Story = {
    args: {
        isLoading: true,
    }
};

export const WithError: Story = {
    args: {
        error: true,
    }
};
