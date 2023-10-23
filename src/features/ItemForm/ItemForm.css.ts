import { style } from '@vanilla-extract/css';

import { unit } from '@src/styles/unit';
import { media } from '@src/styles/media';

export const grid = style({
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '3fr 7fr',
    gridGap: unit(4),
    alignItems: 'flex-end',
    '@media': {
        [media.down('sm')]: {
            gridTemplateColumns: '1fr',
            order: 'revert'
        }
    }
});
