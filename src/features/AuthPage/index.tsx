'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

import { Button } from '@src/components/Button';
import { Container } from '@src/components/Container';
import { GoogleIcon } from '@src/components/Icon';
import { Stack } from '@src/components/Stack';
import { Text, Title } from '@src/components/Typography';
import { ROUTES } from '@src/constants/routes';

export const AuthPage: React.FC = () => {
    const [loading, setLoading] = React.useState(false);

    const handleAuth = React.useCallback(() => {
        setLoading(true);
        signIn('google', { callbackUrl: ROUTES.ADMIN.get() }).catch(() => setLoading(false));
    }, []);

    return (
        <Container size="small" flex flexGrow withPaddingY>
            <Stack flexGrow direction="column" align="start" gap={4}>
                <Stack direction="column" align="start" gap={2}>
                    <Title size="medium">Sign in</Title>
                    <Text color="secondary">Sign in with your Google account to get started.</Text>
                </Stack>
                <Button onClick={handleAuth} isLoading={loading} icon={<GoogleIcon />} fullWidth>
                    Sign in with Google
                </Button>
                <Text size="small" align="center" color="secondary" block>Only admin access for now</Text>
            </Stack>
        </Container>
    );
};
