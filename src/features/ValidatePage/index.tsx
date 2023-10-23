'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { CheckIcon, LockClosedIcon } from '@radix-ui/react-icons';

import { api } from '@src/trpc/react';
import { toast } from '@src/utils/toast';
import { ROUTES } from '@src/constants/routes';
import { Container } from '@src/components/Container';
import { Stack } from '@src/components/Stack';
import { Text, Title } from '@src/components/Typography';
import { Input } from '@src/components/Input';
import { Button } from '@src/components/Button';

export const ValidatePage: React.FC = () => {
    const router = useRouter();
    const [secret, setSecret] = React.useState<string>('');

    const { mutateAsync, isLoading } = api.admin.validate.useMutation();

    const handleSecretChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSecret(e.target.value);
    }, []);

    const handleAuth = React.useCallback(() => {
        mutateAsync({ secret }).then(({ success }) => {
            if (!success) {
                toast.error('Invalid secret');
                return;
            }
            return router.push(ROUTES.ADMIN.get());
        }).catch(() => {
            toast.error('Error occurred');
        });
    }, [router, secret, mutateAsync]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAuth();
    }, [handleAuth]);

    return (
        <Container size="small" flex flexGrow withPaddingY>
            <Stack flexGrow direction="column" align="start" gap={3}>
                <Stack direction="column" align="start" gap={2}>
                    <Title size="medium">Validating</Title>
                    <Text color="secondary">Enter your SECRET to become an admin</Text>
                </Stack>
                <Stack gap={2} fullWidth as="form" onSubmit={handleSubmit}>
                    <Input
                        fullWidth
                        value={secret}
                        onChange={handleSecretChange}
                        placeholder="SECRET"
                        isLoading={isLoading}
                        icon={<LockClosedIcon />}
                        type="password"
                    />
                    <Button variant="primary" icon={<CheckIcon />} />
                </Stack>
            </Stack>
        </Container>
    );
};
