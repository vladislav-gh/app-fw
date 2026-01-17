import type { Viewport } from "next";

import { getTranslations } from "next-intl/server";

import { routing } from "@Shared/i18n";

export async function generateMetadata() {
	const t = await getTranslations();

	return {
		metadataBase: process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL) : undefined,
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		icons: {
			icon: [
				{
					url: "/favicon/favicon-96x96.png",
					sizes: "96x96",
					type: "image/png",
				},
				{
					url: "/favicon/favicon.svg",
					type: "image/svg+xml",
				},
			],
			shortcut: "/favicon/favicon.ico",
			apple: {
				url: "/favicon/apple-touch-icon.png",
				sizes: "180x180",
			},
		},
		manifest: "/site.webmanifest",
		other: {
			"apple-mobile-web-app-title": "vDev",
		},
		title: t("metadata.title"),
		description: "",
	};
}

export const viewport: Viewport = {
	themeColor: "#0b0e0b",
};

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }));
}

export { LayoutRoot as default } from "@App/layouts";
