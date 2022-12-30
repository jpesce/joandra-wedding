// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config) => {
    /** @type {import("webpack").RuleSetRule[] } */
    const configRules = config.module.rules;
    const fileLoaderRule =
      configRules &&
      configRules.find(
        (rule) => rule.test instanceof RegExp && rule.test.test(".svg")
      );
    if (fileLoaderRule) fileLoaderRule.exclude = /\.react\.svg$/;

    config.module.rules.push({
      test: /\.react\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default config;
