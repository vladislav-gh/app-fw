import type { Locale } from "next-intl";

import { getTranslations, setRequestLocale } from "next-intl/server";

export interface PageProps {
	params: Promise<{ locale: Locale; id: string }>;
}

export async function Page({ params }: PageProps) {
	const { locale, id } = await params;

	setRequestLocale(locale);

	const t = await getTranslations("pageWorkout");

	return (
		<main className="flex flex-col gap-25">
			{t("title")}: {id}
		</main>
	);
}
