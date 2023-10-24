import { redirect } from 'next/navigation';

import { ROUTES } from '@src/constants/routes';
import { ValidatePage } from '@src/features/ValidatePage';
import { getServerAuthSession } from '@src/server/auth';
import { UserRole } from '@src/types/user';

export default async function Auth() {
    const session = await getServerAuthSession();

    if (!session || !session.user) {
        return redirect(ROUTES.AUTH.get());
    }

    if (session.user.role === UserRole.ADMIN) {
        return redirect(ROUTES.ADMIN.get());
    }

    return (
        <ValidatePage />
    );
}

export const runtime = 'edge';
