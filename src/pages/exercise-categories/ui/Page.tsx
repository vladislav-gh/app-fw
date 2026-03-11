import type { Locale } from "next-intl";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { CardExerciseCategory, getExerciseCategoriesSystem } from "@Entities/exercise-category";

export interface PageProps {
	params: Promise<{ locale: Locale }>;
}

export async function Page({ params }: PageProps) {
	const { locale } = await params;

	setRequestLocale(locale);

	const t = await getTranslations("pageExerciseCategories");
	const tExerciseCategories = await getTranslations("exerciseCategories");

	const exerciseCategories = await getExerciseCategoriesSystem();

	return (
		<main className="flex flex-col gap-25">
			{t("title")}

			<div className="flex flex-col gap-3">
				{exerciseCategories.map(category => (
					<CardExerciseCategory
						key={category.id}
						categoryId={category.id}
						categoryName={String(
							category.slug
								? tExerciseCategories(category.slug as Parameters<typeof tExerciseCategories>[0])
								: category.name,
						)}
					/>
				))}
			</div>
		</main>
	);
}
