import { getTranslations } from "next-intl/server";

import { CardExerciseCategory, getExerciseCategoriesSystem } from "@Entities/exercise-category";

export async function ListSystem() {
	const t = await getTranslations("exerciseCategories");

	const exerciseCategoriesSystem = await getExerciseCategoriesSystem();

	return (
		<div className="flex flex-col gap-3">
			{exerciseCategoriesSystem.map(category => (
				<CardExerciseCategory
					key={category.id}
					categoryId={category.id}
					categoryName={String(category.slug ? t(category.slug as Parameters<typeof t>[0]) : category.name)}
				/>
			))}
		</div>
	);
}
