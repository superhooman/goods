'use client';

import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';

import { Container } from '@src/components/Container';
import { Stack } from '@src/components/Stack';
import { api } from '@src/trpc/react';
import { Grid } from '@src/components/Grid';
import { ROUTES } from '@src/constants/routes';
import { Button } from '@src/components/Button';

import { FItem } from '../FItem';
import { AdminHeader } from '../AdminHeader';


export const AdminHomePage: React.FC = () => {
    const { data } = api.admin.allItems.useQuery();

    return (
        <Container size="medium" flex withPaddingY>
            <Stack
                direction="column"
                gap={4}
                align="stretch"
            >
                <AdminHeader title="Items" subtitle="Manage your items" />
                <Grid
                    gap={4}
                    columns={{
                        xs: 1,
                        sm: 2,
                    }}
                >
                    {data?.map((item) => (
                        <FItem item={item} key={item.id} edit />
                    ))}
                </Grid>
                <Link href={ROUTES.ADD_ITEM.get()}>
                    <Button size="large" variant="primary" fullWidth icon={<PlusIcon />}>Add Item</Button>
                </Link>
            </Stack>
        </Container>
    );
};
