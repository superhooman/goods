import { style } from '@vanilla-extract/css';

import { media } from '@src/styles/media';

export const base = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--columns-lg, var(--columns)), 1fr)',

    '@media': {
        [media.down('md')]: {
            gridTemplateColumns: 'repeat(var(--columns-md, var(--columns)), 1fr)',
        },
        [media.down('sm')]: {
            gridTemplateColumns: 'repeat(var(--columns-sm, var(--columns)), 1fr)',
        },
        [media.down('xs')]: {
            gridTemplateColumns: 'repeat(var(--columns-xs, var(--columns)), 1fr)',
        },
    }
});
