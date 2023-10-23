'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import { type ItemSchema } from '@src/schemas/item';
import { type Item } from '@src/server/db/schema';
import { api } from '@src/trpc/react';
import { toast } from '@src/utils/toast';
import { ROUTES } from '@src/constants/routes';
import { Container } from '@src/components/Container';
import { Stack } from '@src/components/Stack';
import { Divider } from '@src/components/Divider';
import { Button } from '@src/components/Button';

import { AdminHeader } from '../AdminHeader';
import { ItemForm } from '../ItemForm';


interface EditItemProps {
    item: Item;
}

export const AdminEditItemPage: React.FC<EditItemProps> = ({
    item,
}) => {
    const { id } = item;
    const router = useRouter();
    const { mutateAsync: edit } = api.admin.editItem.useMutation();
    const { mutateAsync: remove, isLoading: isRemoving } = api.admin.removeItem.useMutation();

    const handleEdit = React.useCallback((data: ItemSchema) => {
        edit({
            id,
            data,
        }).then(() => {
            toast.success('Item updated');
            return router.push(ROUTES.ADMIN.get());
        }).catch(() => {
            toast.error('Error occurred');
        });
    }, [edit, id, router]);

    const handleRemove = React.useCallback(() => {
        // TODO: Add confirmation dialog
        const ok = confirm('Are you sure?');

        if (!ok) {
            return;
        }

        remove({ id }).then(() => {
            toast.success('Item removed');
            return router.push(ROUTES.ADMIN.get());
        }).catch(() => {
            toast.error('Error occurred');
        });
    }, [remove, id, router]);

    return (
        <Container size="medium" flex withPaddingY>
            <Stack
                direction="column"
                gap={4}
                align="stretch"
            >
                <AdminHeader title="Edit Item" subtitle={item.name} back={ROUTES.ADMIN.get()} />
                <ItemForm
                    initialData={item}
                    onSubmit={handleEdit}
                />
                <Divider>
                    Danger Zone
                </Divider>
                <Button isLoading={isRemoving} onClick={handleRemove} icon={<TrashIcon />}>Remove</Button>
            </Stack>
        </Container>
    );
};
