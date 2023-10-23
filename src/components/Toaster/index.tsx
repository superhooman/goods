'use client';
import React from 'react';

import { cn } from '@src/utils/cn';
import { Toaster as ToasterBase, type ToasterProps } from '@src/utils/toast';

import * as cls from './Toaster.css';

export const Toaster: React.FC<ToasterProps> = ({ toastOptions, className, ...props }) => {
    return (
        <ToasterBase
            {...props}
            className={cn(className, cls.base)}
            toastOptions={{
                ...toastOptions,
                className: cn(toastOptions?.className, cls.toast)
            }}
        />
    );
};
