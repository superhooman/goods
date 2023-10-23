import { redirect } from 'next/navigation';

import { ROUTES } from '@src/constants/routes';
import { AuthPage } from '@src/features/AuthPage';
import { getServerAuthSession } from '@src/server/auth';

export default async function Auth() {
    const session = await getServerAuthSession();

    if (session) {
        return redirect(ROUTES.ADMIN.get());
    }

    return (
        <AuthPage />
    );
}
