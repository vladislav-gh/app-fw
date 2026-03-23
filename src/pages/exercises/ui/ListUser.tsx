"use client";

import { useQuery } from "@tanstack/react-query";

import { CardExercise, getQueryOptionsExercisesUser } from "@Entities/exercise";
import { useUser } from "@Entities/user";

export function ListUser() {
	const user = useUser();

	const { data: exercisesUser } = useQuery({
		...getQueryOptionsExercisesUser(user?.id ?? ""),
	});

	if (!user || !exercisesUser?.length) {
		return null;
	}

	return (
		<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
			{exercisesUser.map(exercise => (
				<CardExercise key={exercise.id} exercise={exercise} />
			))}
		</div>
	);
}
