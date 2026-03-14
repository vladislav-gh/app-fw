import { getTranslations } from "next-intl/server";

import { CardExercise, getExercisesUser } from "@Entities/exercise";
import { getUser } from "@Entities/user";

export async function ListUser() {
	const user = await getUser();

	if (!user) {
		return null;
	}

	const tExerciseCategories = await getTranslations("exerciseCategories");

	const exercisesUser = await getExercisesUser({ userId: user.id });

	return (
		<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
			{exercisesUser.map(exercise => (
				<CardExercise
					key={exercise.id}
					exerciseId={exercise.id}
					exerciseName={String(exercise.name)}
					exerciseDescription={exercise.description ?? undefined}
					exerciseCategories={exercise.categories.map(category =>
						String(
							category.slug
								? tExerciseCategories(category.slug as Parameters<typeof tExerciseCategories>[0])
								: category.name,
						),
					)}
					isEditable
					isRemovable
				/>
			))}
		</div>
	);
}
