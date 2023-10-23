export type Screen = 'initial' | 'xs' | 'sm' | 'md' | 'lg';

export const breakpoints: Record<Screen, number> = {
    initial: 0,
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
};

const withScreen = (query: string) => `screen and ${query}`;

export const media = {
    down: (screen: Screen, dropScreen?: boolean) => {
        const query = `(max-width: ${breakpoints[screen] - 0.5}px)`;

        if (dropScreen) {
            return query;
        }

        return withScreen(query);
    },
    up: (screen: Screen, dropScreen?: boolean) => {
        const query = `(min-width: ${breakpoints[screen]}px)`;

        if (dropScreen) {
            return query;
        }

        return withScreen(query);
    },
};

