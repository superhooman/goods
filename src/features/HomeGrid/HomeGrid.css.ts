import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/media';
import { unit } from '@src/styles/unit';

export const base = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: unit(4),
    '@media': {
        [media.down('lg')]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        [media.down('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [media.down('sm')]: {
            gridTemplateColumns: 'repeat(1, 1fr)',
        },
    }
});

export const large = style({
    gridColumn: 'auto / span 2',
    gridRow: 'auto / span 2',
    '@media': {
        [media.down('md')]: {
            gridColumn: 'auto / span 1',
            gridRow: 'auto / span 1',
        }
    }
});
