import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

import { spawnSync } from "node:child_process";

import createNextIntlPlugin from "next-intl/plugin";
import withSerwistInit from "@serwist/next";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

const revision = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout ?? crypto.randomUUID();

const withSerwist = withSerwistInit({
	additionalPrecacheEntries: [{ url: "/~offline", revision }],
	swSrc: "app/sw.ts",
	swDest: "public/sw.js",
	reloadOnOnline: false,
	disable: process.env.NODE_ENV === "development",
});

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
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
			{
				source: "/sw.js",
				headers: [
					{
						key: "Content-Type",
						value: "application/javascript; charset=utf-8",
					},
					{
						key: "Cache-Control",
						value: "no-cache, no-store, must-revalidate",
					},
					{
						key: "Content-Security-Policy",
						value: "default-src 'self'; script-src 'self'",
					},
				],
			},
		];
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

export default withSerwist(withNextIntl(nextConfig));
