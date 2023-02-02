import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@src/components/Button";
import { Container } from "@src/components/Container";
import { Grid } from "@src/components/Grid";
import { Stack } from "@src/components/Stack";
import { ROUTES } from "@src/constants/routes";
import { AdminHeader } from "@src/features/AdminHeader";
import { FItem } from "@src/features/FItem";
import { api } from "@src/utils/api";
import { withUser } from "@src/utils/serverSideProps/withUser";
import type { NextPage } from "next";
import Link from "next/link";

const ItemsPage: NextPage = () => {
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

export const getServerSideProps = withUser();

export default ItemsPage;
