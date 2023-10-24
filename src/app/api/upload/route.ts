import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

import { s3 } from '@src/server/s3';
import { FOLDERS } from '@src/constants/s3';
import { env } from '@src/env.mjs';
import { getServerAuthSession } from '@src/server/auth';
import { getFile } from '@src/server/formData/getFile';


interface SuccessResponse {
    success: true;
    id: string;
}

interface ErrorResponse {
    success: false;
    error: string;
}

export type Response = SuccessResponse | ErrorResponse;

const reply = <T extends Response>(json: T, status = 200) => {
    return NextResponse.json(json, { status });
};

const handler = async (req: Request) => {
    const session = await getServerAuthSession();

    if (!session || !session.user) {
        return reply({
            success: false,
            error: 'Unauthorized',
        }, 403);
    }

    let file: File;

    try {
        [file] = await getFile(req, 'file');
    } catch (_e) {
        return reply({
            success: false,
            error: 'Unable to upload file',
        }, 400);
    }

    const id = `${Date.now()}_${nanoid(24)}`;

    const arrayBuffer = await file.arrayBuffer();

    const params = {
        Bucket: env.S3_BUCKET,
        Key: `${FOLDERS.ITEMS}/${id}`,
        Body: Buffer.from(arrayBuffer),
        ContentType: file.type,
    };

    const object = await s3.putObject(params).catch(() => null);

    if (!object) {
        return reply({
            success: false,
            error: 'Unable to upload file',
        }, 400);
    }

    return reply({
        success: true,
        id,
    });
};

export { handler as POST };

export const runtime = 'edge';
