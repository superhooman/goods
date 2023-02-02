import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
// @ts-check
import { env } from "./src/env/server.mjs";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      {
        source: '/s3/:folder/:path*',
        destination: `${env.S3_ENDPOINT}/${env.S3_TENANT_ID}%3A${env.S3_BUCKET_NAME}/:folder/:path*`,
      },
    ]
  }
};

export default withVanillaExtract(config);
