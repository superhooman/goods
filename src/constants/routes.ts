import urlcat from 'urlcat';

export const DOMAIN_NAME = 'que.kz';

export const DOMAIN = `https://${DOMAIN_NAME}`;

type Stringifiable = string | number | boolean | null | undefined;

type StringifiableRecord = Record<string, Stringifiable>;

interface RouteOptions<Params extends StringifiableRecord = StringifiableRecord> {
    params?: Params;
    full?: boolean;
}

class Route<Params extends StringifiableRecord = StringifiableRecord> {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    private formatUrl = (path: string, full?: boolean) => `${full ? DOMAIN : ''}${path}`;

    get = ({ params, full }: RouteOptions<Params> = {}) => urlcat(this.formatUrl(this.path, full), params ?? {});
}

export const ROUTES = {
    HOME: new Route('/'),
    AUTH: new Route('/auth'),
    ADMIN: new Route('/admin'),

    ADD_ITEM: new Route('/admin/add'),
    EDIT_ITEM: new Route<{ id: string }>('/admin/edit/:id'),

    API: {
        UPLOAD: new Route('/api/upload'),
    },

    S3: new Route<{ folder: string, id: string }>('/s3/:folder/:id'),
};
