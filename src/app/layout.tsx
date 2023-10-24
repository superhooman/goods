import '@src/styles/reset.css';
import '@src/styles/main.css';

import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { type Metadata } from 'next';

import { TRPCReactProvider } from '@src/trpc/react';
import { DOMAIN_NAME, ROUTES } from '@src/constants/routes';
import { Toaster } from '@src/components/Toaster';

const inter = Inter({
    subsets: ['latin'],
});

const title = `Products | ${DOMAIN_NAME}`;
const description = 'A collection of beautiful products.';

export const metadata: Metadata = {
    metadataBase: new URL(ROUTES.HOME.get({ full: true })),
    title,
    description,
    icons: [{ rel: 'icon', url: '/favicon.ico' }, { rel: 'apple-touch-icon', sizes: '256x256', url: '/touch.png' }],
    openGraph: {
        title,
        description,
        images: [
            '/cover.png'
        ]
    }
};

export default function RootLayout({
    children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
                <Toaster />
            </body>
        </html>
    );
}
