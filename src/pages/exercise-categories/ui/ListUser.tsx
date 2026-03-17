"use client";

import { useQuery } from "@tanstack/react-query";

import { CardExerciseCategory, getQueryOptionsExerciseCategoriesUser } from "@Entities/exercise-category";
import { getQueryOptionsUser } from "@Entities/user";

export function ListUser() {
	const { data: user } = useQuery({
		...getQueryOptionsUser(),
	});

	const { data: exerciseCategoriesUser } = useQuery({
		...getQueryOptionsExerciseCategoriesUser(user?.id ?? ""),
	});

	if (!user || !exerciseCategoriesUser?.length) {
		return null;
	}

	return (
		<div className="flex flex-col gap-3">
			{exerciseCategoriesUser?.map(category => (
				<CardExerciseCategory
					key={category.id}
					categoryId={category.id}
					categoryName={String(category.name)}
					isEditable
					isRemovable
				/>
			))}
		</div>
	);
}
