import React from "react";
import type { NextPage } from "next";

import { Container } from "@src/components/Container";
import { Stack } from "@src/components/Stack";

import { ItemForm } from "@src/features/ItemForm";
import { AdminHeader } from "@src/features/AdminHeader";
import { withUser } from "@src/utils/serverSideProps/withUser";
import { api } from "@src/utils/api";
import { type ItemSchema } from "@src/schemas/item";

import { toast } from '@src/utils/toast';
import { useRouter } from "next/router";
import { ROUTES } from "@src/constants/routes";

const AddNewItem: NextPage = () => {
    const { push } = useRouter();
    const { mutateAsync } = api.admin.addItem.useMutation();

    const handleAdd = React.useCallback((data: ItemSchema) => {
        mutateAsync(data).then(() => {
            toast.success('Item added');
            return push(ROUTES.ADMIN.get());
        }).catch(() => {
            toast.error('Error occurred')
        });
    }, [mutateAsync, push]);

    return (
        <Container size="medium" flex withPaddingY>
            <Stack
                direction="column"
                gap={4}
                align="stretch"
            >
                <AdminHeader title="Add Item" subtitle="Add new item" back={ROUTES.ADMIN.get()} />
                <ItemForm
                    onSubmit={handleAdd}
                />
            </Stack>
        </Container>
    );
};

export const getServerSideProps = withUser();

export default AddNewItem;
