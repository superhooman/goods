import React from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageIcon } from '@radix-ui/react-icons';

import { cn } from '@src/utils/cn';

import { Loader } from '../Loader';
import * as cls from './ImageUploader.css';
import { Stack } from '../Stack';
import { Text } from '../Typography';

const DEFAULT_LABEL = 'Drop a file or click to select one';

export interface ImageUploaderProps {
    url?: string;
    onFileChange(file: File): void;
    isLoading?: boolean;
    error?: boolean;
    label?: string;
    accept?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    url,
    onFileChange,
    isLoading = false,
    error,
    label = DEFAULT_LABEL,
    accept = 'image/*',
}) => {
    const isEmpty = !url;

    const onDrop = React.useCallback((files: File[]) => {
        const file = files[0];

        if (!file) {
            return;
        }

        onFileChange(file);
    }, [onFileChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            [accept]: [],
        },
    });

    const content = React.useMemo(() => {
        if (isLoading && isEmpty) {
            return null;
        }
        if (isEmpty) {
            return (
                <>
                    <ImageIcon className={cls.icon} />
                    <Text size="small" align="center">{label}</Text>
                </>
            );
        }
        return (
            <div className={cls.image} style={{ backgroundImage: `url(${url})` }} />
        );
    }, [isEmpty, url, isLoading, label]);

    return (
        <div className={
            cn(
                cls.base,
                error && cls.errored,
                isEmpty && cls.empty,
                isDragActive && cls.dragActive,
            )
        }>
            <Stack direction="column" gap={2} className={cls.content} {...getRootProps()}>
                {content}
                {isLoading && (
                    <div className={cls.loader}>
                        <Loader size="large" />
                    </div>
                )}
                <input className={cls.input} type="file" {...getInputProps()} />
            </Stack>
        </div>
    );
};
