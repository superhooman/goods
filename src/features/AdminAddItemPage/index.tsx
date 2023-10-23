'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { type ItemSchema } from '@src/schemas/item';
import { api } from '@src/trpc/react';
import { toast } from '@src/utils/toast';
import { ROUTES } from '@src/constants/routes';
import { Container } from '@src/components/Container';
import { Stack } from '@src/components/Stack';

import { AdminHeader } from '../AdminHeader';
import { ItemForm } from '../ItemForm';

export const AdminAddItemPage: React.FC = () => {
    const router = useRouter();
    const { mutateAsync } = api.admin.addItem.useMutation();

    const handleAdd = React.useCallback((data: ItemSchema) => {
        mutateAsync(data).then(() => {
            toast.success('Item added');
            return router.push(ROUTES.ADMIN.get());
        }).catch(() => {
            toast.error('Error occurred');
        });
    }, [mutateAsync, router]);

    return (
        <Container size="medium" flex withPaddingY>
            <Stack
                direction="column"
                gap={4}
                align="stretch"
            >
                <AdminHeader title="Add Item" subtitle="Add new item" back={ROUTES.ADMIN.get()} />
                <ItemForm onSubmit={handleAdd} />
            </Stack>
        </Container>
    );
};
