import React from 'react';

import { cn } from '@src/utils/cn';
import { unit } from '@src/styles/unit';
import { breakpoints, type Screen } from '@src/styles/media';

import * as cls from './Grid.css';

type GridBreakpointColumns = Partial<Record<Screen, number>>;

interface GridProps extends React.ComponentProps<'div'> {
    columns?: number | GridBreakpointColumns;
    gap?: number;
}

const fillValues = (columns: GridBreakpointColumns) => {
    const keys = Object.keys(breakpoints);
    const values = Object.values(columns);
    const lastValue = values[values.length - 1];

    return keys.reduce<GridBreakpointColumns>((acc, key) => {
        const breakpoint = key as Screen;
        return {
            ...acc,
            [breakpoint]: columns[breakpoint] ?? lastValue,
        };
    }, {});
};

const getVariables = (columns: number | GridBreakpointColumns) => {
    if (typeof columns === 'number') {
        return {
            '--columns': columns,
        } as React.CSSProperties;
    }

    const filledColumns = fillValues(columns);

    return Object.entries(filledColumns).reduce((acc, [key, value]) => {
        return {
            ...acc,
            [`--columns-${key}`]: value,
        };
    }, {}) as React.CSSProperties;
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
    ({ columns = 1, gap = 0, className, style, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(className, cls.base)}
                style={{
                    ...style,
                    ...getVariables(columns),
                    gap: unit(gap),
                }}
                {...props}
            />
        );
    }
);

Grid.displayName = 'Grid';
