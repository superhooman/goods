'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ChevronLeftIcon, ExitIcon, PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Menu, MenuItemWithIcon, MenuSeparator } from '@src/components/Menu';
import { Stack } from '@src/components/Stack';
import { Text, Title } from '@src/components/Typography';
import { Avatar } from '@src/components/Avatar';
import { Button } from '@src/components/Button';
import { ROUTES } from '@src/constants/routes';
import { Head } from '@src/components/Head';

interface AdminHeaderProps {
    title: string;
    subtitle: string;
    back?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
    title,
    subtitle,
    back,
}) => {
    const { data: session } = useSession();

    const user = session?.user;

    const handleLogout = React.useCallback(async () => {
        await signOut();
    }, []);

    return (
        <>
            <Head
                title={`${title} | admin at que.kz`}
                description={subtitle}
                url={ROUTES.ADMIN.get()}
            />
            <Stack justify="between" gap={8} fullWidth>
                <Stack truncate gap={4} align="center">
                    {back ? (
                        <Link href={back}>
                            <Button icon={<ChevronLeftIcon />} />
                        </Link>
                    ) : null}
                    <Stack truncate direction="column" align="start" gap={1}>
                        <Title size="medium" truncate>{title}</Title>
                        <Text color="secondary" truncate>{subtitle}</Text>
                    </Stack>
                </Stack>
                <Menu
                    content={
                        <>
                            <Link href={ROUTES.ADD_ITEM.get()}>
                                <MenuItemWithIcon icon={<PlusIcon />}>
                                    Add Item
                                </MenuItemWithIcon>
                            </Link>
                            <MenuSeparator />
                            <MenuItemWithIcon onClick={handleLogout} icon={<ExitIcon />}>
                                Logout
                            </MenuItemWithIcon>
                        </>
                    }
                >
                    <div>
                        <Avatar name={user?.name} img={user?.image} />
                    </div>
                </Menu>
            </Stack>
        </>
    );
};
