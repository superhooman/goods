import { redirect } from 'next/navigation';

import { ROUTES } from '@src/constants/routes';
import { AdminHomePage } from '@src/features/AdminHomePage';
import { getServerAuthSession } from '@src/server/auth';
import { UserRole } from '@src/types/user';

export default async function Admin() {
    const session = await getServerAuthSession();

    if (!session || !session.user) {
        return redirect(ROUTES.AUTH.get());
    }

    if (session.user.role !== UserRole.ADMIN) {
        return redirect(ROUTES.HOME.get());
    }

    return (
        <AdminHomePage />
    );
}

export const runtime = 'edge';
