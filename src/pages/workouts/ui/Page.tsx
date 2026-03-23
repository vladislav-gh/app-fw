import type { Locale } from "next-intl";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { FormWorkoutAdd } from "@Features/workout";

import { List } from "./List";

export interface PageProps {
	params: Promise<{ locale: Locale }>;
}

export async function Page({ params }: PageProps) {
	const { locale } = await params;

	setRequestLocale(locale);

	const t = await getTranslations("pageWorkouts");

	return (
		<main className="flex flex-col gap-25">
			{t("title")}

			<List />
			<FormWorkoutAdd />
		</main>
	);
}
