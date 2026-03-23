import type { Locale } from "next-intl";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { Workout } from "./Workout";

export interface PageProps {
	params: Promise<{ locale: Locale }>;
}

export async function Page({ params }: PageProps) {
	const { locale } = await params;

	setRequestLocale(locale);

	const t = await getTranslations("pageWorkout");

	return (
		<main className="flex flex-col gap-25">
			{t("title")}

			<Workout />
		</main>
	);
}
