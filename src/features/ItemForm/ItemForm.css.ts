import { unit } from '@src/styles/unit';
import { style } from '@vanilla-extract/css';
import { breakpoint } from '@src/styles/main.css';

export const grid = style({
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '3fr 7fr',
    gridGap: unit(4),
    alignItems: 'flex-end',
    '@media': {
        [`screen and (max-width: ${breakpoint.sm})`]: {
            gridTemplateColumns: '1fr',
            order: 'revert'
        }
    }
});
