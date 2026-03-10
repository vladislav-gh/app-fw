import type { Locale } from "next-intl";

import { getTranslations, setRequestLocale } from "next-intl/server";

export interface PageProps {
	params: Promise<{ locale: Locale }>;
}

export async function Page({ params }: PageProps) {
	const { locale } = await params;

	setRequestLocale(locale);

	const t = await getTranslations("pageExercises");

	return <main className="flex flex-col gap-25">{t("title")}</main>;
}
