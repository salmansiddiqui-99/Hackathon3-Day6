const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  // Next.js Config File
};

const SentryWebpackPluginOptions = {
  silent: true, // Suppresses logs
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
