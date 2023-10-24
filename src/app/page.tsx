import { db } from '@src/server/db';
import { items } from '@src/server/db/schema';
import { Container } from '@src/components/Container';
import { HomeGrid } from '@src/features/HomeGrid';

export default async function Home() {
    const list = await db.select().from(items);

    return (
        <Container size="noLimit" withPadding withPaddingY>
            <HomeGrid items={list} />
        </Container>
    );
}

export const runtime = 'edge';
