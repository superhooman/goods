import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
    <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="256x256" href="/touch.png" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;

