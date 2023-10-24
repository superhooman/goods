import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { ROUTES } from '@src/constants/routes';
import { AdminEditItemPage } from '@src/features/AdminEditItemPage';
import { getServerAuthSession } from '@src/server/auth';
import { db } from '@src/server/db';
import { items } from '@src/server/db/schema';
import { UserRole } from '@src/types/user';

interface Props {
    params: {
        id: string;
    }
}

export default async function Auth({ params: { id } }: Props) {
    const session = await getServerAuthSession();

    if (!session || !session.user) {
        return redirect(ROUTES.AUTH.get());
    }

    if (session.user.role !== UserRole.ADMIN) {
        return redirect(ROUTES.HOME.get());
    }

    const [item] = await db.select().from(items).where(eq(items.id, id));

    if (!item) {
        return redirect(ROUTES.ADMIN.get());
    }

    return (
        <AdminEditItemPage item={item} />
    );
}

export const runtime = 'edge';
