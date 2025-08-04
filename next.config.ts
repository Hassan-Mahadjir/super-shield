const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["qsbkfaheljebzkozugkv.supabase.co"],
  },
};

module.exports = withNextIntl(nextConfig);
