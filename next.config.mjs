import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { env } from "./src/env.mjs";

const withVanillaExtract = createVanillaExtractPlugin();

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
    // eslint-disable-next-line @typescript-eslint/require-await
    async rewrites() {
        return [
            {
                source: '/s3/:folder/:path*',
                destination: `${env.S3_PUBLIC_URL}/:folder/:path*`,
            }
        ]
    },
};

export default withVanillaExtract(config);
