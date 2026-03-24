import type { Locale } from "next-intl";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { ButtonSignOut } from "@Features/auth";

import { Info } from "./Info";
import { Theme } from "./Theme";

export interface PageProps {
	params: Promise<{ locale: Locale }>;
}

export async function Page({ params }: PageProps) {
	const { locale } = await params;

	setRequestLocale(locale);

	const t = await getTranslations("pageProfile");

	return (
		<main className="flex flex-col gap-25">
			{t("title")}

			<Info />
			<Theme />
			<ButtonSignOut />
		</main>
	);
}
