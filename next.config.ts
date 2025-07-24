const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["pslwvfwlrzcjibcxyjhj.supabase.co"],
  },
};

module.exports = withNextIntl(nextConfig);
