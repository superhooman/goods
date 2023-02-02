import { breakpoint } from '@src/styles/main.css';
import { unit } from '@src/styles/unit';
import { style } from '@vanilla-extract/css';

export const base = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: unit(4),
    '@media': {
        [`screen and (max-width: ${breakpoint.lg})`]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        [`screen and (max-width: ${breakpoint.md})`]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [`screen and (max-width: ${breakpoint.sm})`]: {
            gridTemplateColumns: 'repeat(1, 1fr)',
        },
    }
});

export const large = style({
    gridColumn: 'auto / span 2',
    gridRow: 'auto / span 2',
    '@media': {
        [`screen and (max-width: ${breakpoint.md})`]: {
            gridColumn: 'auto / span 1',
            gridRow: 'auto / span 1',
        }
    }
});
