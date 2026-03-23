"use client";

import { useQuery } from "@tanstack/react-query";

import { CardExerciseCategory, getQueryOptionsExerciseCategoriesUser } from "@Entities/exercise-category";
import { useUser } from "@Entities/user";

export function ListUser() {
	const user = useUser();

	const { data: exerciseCategoriesUser } = useQuery({
		...getQueryOptionsExerciseCategoriesUser(user?.id ?? ""),
	});

	if (!user || !exerciseCategoriesUser?.length) {
		return null;
	}

	return (
		<div className="flex flex-col gap-3">
			{exerciseCategoriesUser?.map(category => (
				<CardExerciseCategory key={category.id} category={category} />
			))}
		</div>
	);
}
