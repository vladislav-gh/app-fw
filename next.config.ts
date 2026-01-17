import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

const imagesRemotePatterns: RemotePattern[] = [
	{
		hostname: "localhost",
	},
];

if (process.env.NEXT_PUBLIC_UPLOADS_HOSTNAME) {
	imagesRemotePatterns.push({
		protocol: (process.env.NEXT_PUBLIC_UPLOADS_PROTOCOL as "http" | "https") ?? "https",
		hostname: process.env.NEXT_PUBLIC_UPLOADS_HOSTNAME,
		port: process.env.NEXT_PUBLIC_UPLOADS_PORT,
		pathname: process.env.NEXT_PUBLIC_UPLOADS_PATHNAME,
		search: process.env.NEXT_PUBLIC_UPLOADS_SEARCH,
	});
}

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: imagesRemotePatterns.length ? imagesRemotePatterns : undefined,
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule: { test: { test: (arg0: string) => unknown } }) =>
			rule.test?.test?.(".svg"),
		);

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: {
					loader: "@svgr/webpack",
					options: {
						svgoConfig: {
							plugins: [
								{
									name: "preset-default",
									params: {
										overrides: {
											removeViewBox: false,
										},
									},
								},
							],
						},
					},
				},
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

export default withNextIntl(nextConfig);
