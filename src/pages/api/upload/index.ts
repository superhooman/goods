import busboy from 'busboy';

import type { NextApiHandler, NextApiRequest } from 'next';

import { env } from '@src/env/server.mjs';
import { s3 } from '@src/server/s3';
import { getServerAuthSession } from '@src/server/auth';
import { randomUUID } from 'crypto';
import { FOLDERS } from '@src/constants/s3';

const processFile = (req: NextApiRequest): Promise<{
    data: Buffer;
    mimeType: string;
}> => new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });

    bb.on('file', (_, file, info) => {
        const { mimeType } = info;
        if (!mimeType.startsWith('image/')) {
            reject(new Error('File is not an image'));
            return;
        }

        const chunks: Buffer[] = [];

        file.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });

        file.on('end', () => {
            resolve({
                data: Buffer.concat(chunks),
                mimeType,
            });
        });
    });

    req.pipe(bb);
});

interface SuccessResponse {
    success: true;
    id: string;
}

interface ErrorResponse {
    success: false;
    error: string;
}

export type Response = SuccessResponse | ErrorResponse;

const handler: NextApiHandler<Response> = async (req, res) => {
    const session = await getServerAuthSession({ req, res });

    if (!session || !session.user) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
        });
    }

    if (session.user.role !== 'ADMIN') {
        return res.status(403).json({
            success: false,
            error: 'Forbidden',
        });
    }

    const file = await processFile(req).catch(() => null);

    if (!file) {
        return res.status(400).json({
            success: false,
            error: 'Unable to process file',
        });
    }

    const id = `${Date.now()}_${randomUUID()}`;

    const params = {
        Bucket: env.S3_BUCKET_NAME,
        Key: `${FOLDERS.ITEMS}/${id}`,
        Body: file.data,
        ContentType: file.mimeType,
    };

    const object = await s3.putObject(params).catch(() => null);

    if (!object) {
        return res.status(500).json({
            success: false,
            error: 'Unable to upload file',
        });
    }

    return res.status(200).json({
        success: true,
        id,
    });
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
