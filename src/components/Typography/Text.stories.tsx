import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './index';

const meta: Meta<typeof Text> = {
    title: 'Components/Text',
    component: Text,
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
type Story = StoryObj<typeof Text>;


const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu aliquet leo, nec facilisis purus. Mauris viverra finibus sem. Morbi cursus nibh lorem, a aliquam sapien rutrum nec. Sed et tempus purus. Praesent sit amet est tincidunt elit varius pulvinar. Quisque imperdiet mollis risus ac imperdiet. Ut fringilla odio ac commodo aliquam. Proin viverra suscipit elit sit amet commodo. Mauris sed orci libero. Suspendisse non nibh dignissim, efficitur ipsum vitae, volutpat sapien. Aenean accumsan turpis eget pulvinar egestas. Mauris tortor arcu, aliquet ac posuere pretium, sagittis vel nisi. Nulla consequat ipsum lacinia nisi vehicula euismod. Nunc luctus, est ac mattis laoreet, nibh tortor malesuada neque, vitae consectetur tellus nibh et sapien. Nam facilisis aliquet eros, ac cursus est porttitor ut. Pellentesque congue sapien ac est suscipit, eu fermentum arcu volutpat.';

export const Default: Story = {
    args: {
        children: TEXT,
        size: 'medium',
    },
};
