import { getTranslations } from "next-intl/server";

import { CardExercise, getExercisesSystem } from "@Entities/exercise";

export async function ListSystem() {
	const t = await getTranslations("exercises");

	const exercisesSystem = await getExercisesSystem();

	return (
		<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
			{exercisesSystem.map(exercise => (
				<CardExercise
					key={exercise.id}
					exerciseId={exercise.id}
					exerciseName={String(exercise.slug ? t(exercise.slug as Parameters<typeof t>[0]) : exercise.name)}
					exerciseDescription={exercise.description ?? undefined}
				/>
			))}
		</div>
	);
}
