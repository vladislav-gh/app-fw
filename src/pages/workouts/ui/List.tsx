"use client";

import { useQuery } from "@tanstack/react-query";

import { useUser } from "@Entities/user";
import { CardWorkout, getQueryOptionsWorkoutsAll } from "@Entities/workout";

export function List() {
	const user = useUser();

	const { data: workouts } = useQuery({
		...getQueryOptionsWorkoutsAll(user?.id ?? ""),
	});

	if (!user || !workouts?.length) {
		return null;
	}

	return (
		<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
			{workouts.map(workout => (
				<CardWorkout key={workout.id} workout={workout} />
			))}
		</div>
	);
}
