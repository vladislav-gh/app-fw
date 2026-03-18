"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { CardExercise, getQueryOptionsExercisesUser } from "@Entities/exercise";
import { useUser } from "@Entities/user";

export function ListUser() {
	const tExerciseCategories = useTranslations("exerciseCategories");
	const user = useUser();

	const { data: exercisesUser } = useQuery({
		...getQueryOptionsExercisesUser(user?.id ?? ""),
	});

	if (!user || !exercisesUser?.length) {
		return null;
	}

	return (
		<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
			{exercisesUser?.map(exercise => (
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
