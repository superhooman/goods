import React from "react";
import type { NextPage } from "next";

import { Container } from "@src/components/Container";
import { Stack } from "@src/components/Stack";

import { ItemForm } from "@src/features/ItemForm";
import { AdminHeader } from "@src/features/AdminHeader";
import { withUser } from "@src/utils/serverSideProps/withUser";
import { api } from "@src/utils/api";
import { type ItemSchema } from "@src/schemas/item";
import { prisma } from "@src/server/db";

import { toast } from '@src/utils/toast';
import type { Item } from "@prisma/client";
import { Button } from "@src/components/Button";
import { TrashIcon } from "@radix-ui/react-icons";
import { Divider } from "@src/components/Divider";
import { ROUTES } from "@src/constants/routes";
import { useRouter } from "next/router";

type EditItemQuery = {
    id: string;
}

interface EditItemProps {
    item: Omit<Item, 'dateAdded'>;
}

const EditItemPage: NextPage<EditItemProps> = ({
    item,
}) => {
    const { id } = item;
    const { push } = useRouter();
    const { mutateAsync: edit } = api.admin.editItem.useMutation();
    const { mutateAsync: remove, isLoading: isRemoving } = api.admin.removeItem.useMutation();

    const handleEdit = React.useCallback((data: ItemSchema) => {
        edit({
            id,
            data,
        }).then(() => {
            toast.success('Item updated');
            return push(ROUTES.ADMIN.get());
        }).catch(() => {
            toast.error('Error occurred')
        });
    }, [edit, id, push]);

    const handleRemove = React.useCallback(() => {
        // TODO: Add confirmation dialog
        const ok = confirm('Are you sure?');

        if (!ok) {
            return;
        }

        remove({ id }).then(() => {
            toast.success('Item removed');
            return push(ROUTES.ADMIN.get());
        }).catch(() => {
            toast.error('Error occurred');
        });
    }, [remove, id, push]);

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

export const getServerSideProps = withUser<EditItemProps, EditItemQuery>(async ({ params, session }) => {
    const id = params?.id;

    if (!id) {
        return {
            notFound: true,
        }
    }

    const item = await prisma.item.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
            url: true,
            userId: true,
            brand: true,
            currency: true,
            dateAdded: false,
        },
    });

    if (!item) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            item,
            session,
        }
    }
});

export default EditItemPage;
