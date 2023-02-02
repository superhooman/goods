import urlcat from 'urlcat';

export const DOMAIN = 'https://que.kz';

type StringifiableRecord = Record<string, string | number | boolean | null | undefined>;

interface RouteOptions {
    params?: StringifiableRecord;
    full?: boolean;
}

class Route {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    private formatUrl = (path: string, full?: boolean) => `${full ? DOMAIN : ''}${path}`;

    get = ({ params, full }: RouteOptions = {}) => urlcat(this.formatUrl(this.path, full), params ?? {})
}

export const ROUTES = {
    HOME: new Route('/'),
    AUTH: new Route('/auth'),
    ADMIN: new Route('/admin'),

    ADD_ITEM: new Route('/admin/add'),
    EDIT_ITEM: new Route('/admin/edit/:id'),

    API: {
        UPLOAD: new Route('/api/upload'),
    },

    S3: new Route('/s3/:folder/:id'),
};
