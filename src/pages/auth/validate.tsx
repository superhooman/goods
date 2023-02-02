import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "@src/server/auth";
import { Container } from "@src/components/Container";
import { Button } from "@src/components/Button";
import { Stack } from "@src/components/Stack";
import { Text, Title } from "@src/components/Typography";
import React from "react";
import { toast } from "@src/utils/toast";
import { ROUTES } from "@src/constants/routes";
import { Input } from "@src/components/Input";
import { api } from "@src/utils/api";
import { useRouter } from "next/router";
import { CheckIcon, LockClosedIcon } from "@radix-ui/react-icons";

const ValidatePage: NextPage = () => {
    const { push } = useRouter();
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
            return push(ROUTES.ADMIN.get());
        }).catch(() => {
            toast.error('Error occurred');
        });
    }, [push, secret, mutateAsync]);

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: ROUTES.AUTH.get(),
                permanent: false,
            },
        };
    }

    return { props: {} }
}

export default ValidatePage;