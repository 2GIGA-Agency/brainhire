import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		unoptimized: true,
		domains: ['blog.kreorg.ru'],
	},
	experimental: {
		optimizePackageImports: ['@chakra-ui/react'],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
