import type { Locale } from "next-intl";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getExercisesSystem } from "@Entities/exercise";

export interface PageProps {
	params: Promise<{ locale: Locale }>;
}

export async function Page({ params }: PageProps) {
	const { locale } = await params;

	setRequestLocale(locale);

	const t = await getTranslations("pageExercises");
	const tExercises = await getTranslations("exercises");

	const exercises = await getExercisesSystem();

	return (
		<main className="flex flex-col gap-25">
			{t("title")}

			<div className="flex flex-col gap-3">
				{exercises.map(exercise => (
					<div key={exercise.id}>
						{exercise.slug ? tExercises(exercise.slug as Parameters<typeof tExercises>[0]) : exercise.name}
					</div>
				))}
			</div>
		</main>
	);
}
