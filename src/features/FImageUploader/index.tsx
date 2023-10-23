'use client';

import React from 'react';

import { ImageUploader, type ImageUploaderProps } from '@src/components/ImageUploader';
import { ROUTES } from '@src/constants/routes';
import { FOLDERS } from '@src/constants/s3';
import { toast } from '@src/utils/toast';
import { type Response } from '@src/app/api/upload/route';

interface FImageUploaderProps extends Omit<ImageUploaderProps, 'onFileChange' | 'url' | 'isLoading'> {
    value?: string;
    onChange?(value: string): void;
}

const uploadFile = (file: File): Promise<Response> => {
    const formData = new FormData();
    formData.append('file', file);

    return fetch(ROUTES.API.UPLOAD.get(), {
        method: 'POST',
        body: formData,
    }).then((response) => response.json() as unknown as Response);
};

export const FImageUploader: React.FC<FImageUploaderProps> = ({
    value,
    onChange,
    ...props
}) => {
    const [url, setUrl] = React.useState<string>(value ? ROUTES.S3.get({
        params: {
            id: value,
            folder: FOLDERS.ITEMS,
        }
    }) : '');
    const [isLoading, setIsLoading] = React.useState(false);

    const upload = React.useCallback(async (file: File) => {
        setIsLoading(true);
        
        const response = await uploadFile(file);
        setIsLoading(false);

        if (response.success) {
            const url = ROUTES.S3.get({
                params: {
                    id: response.id,
                    folder: FOLDERS.ITEMS,
                }
            });
            setUrl(url);
            onChange?.(response.id);
            return;
        }

        toast.error(response.error);
    }, [onChange]);

    const onFileChange = React.useCallback(async (file: File) => {
        const reader = new FileReader();

        reader.onload = () => {
            setUrl(reader.result as string);
        };

        setIsLoading(true);
        reader.readAsDataURL(file);

        await upload(file);
    }, [upload]);

    return (
        <ImageUploader
            url={url}
            onFileChange={onFileChange}
            isLoading={isLoading}
            {...props}
        />
    );
};
