import { style } from '@vanilla-extract/css';

import { vars } from '@src/styles/main.css';
import { unit } from '@src/styles/unit';

export const base = style({
    display: 'block',
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
});

export const empty = style({});

export const dragActive = style({});

export const errored = style({});

export const content = style({
    position: 'absolute',
    inset: 0,
    border: `1px solid ${vars.color.neutral300}`,
    borderRadius: vars.radius.lg,
    transition: 'box-shadow 0.2s ease-in-out',
    overflow: 'hidden',
    cursor: 'pointer',
    color: vars.color.textSecondary,

    selectors: {
        [`${empty} &`]: {
            borderStyle: 'dashed',
            padding: unit(4),
        },
        [`${dragActive} &`]: {
            borderStyle: 'solid',
            boxShadow: `0 0 0 6px ${vars.color.neutral200}`,
        },
        [`${errored} &`]: {
            borderColor: vars.color.danger500,
            color: vars.color.danger500,
        },
        '&:focus-within': {
            boxShadow: `0 0 0 3px ${vars.color.neutral200}`,
        }
    }
});

export const image = style({
    position: 'absolute',
    inset: -1,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
});

export const loader = style({
    position: 'absolute',
    inset: -1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: vars.color.white,
    opacity: 0.8,
});

export const icon = style({
    width: unit(5),
    height: unit(5),
});

export const input = style({
    display: 'none',
});
