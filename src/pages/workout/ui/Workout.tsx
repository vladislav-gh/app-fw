"use client";

import { notFound } from "next/navigation";

import { useWorkout } from "@Entities/workout";

export function Workout() {
	const { workout, isLoading } = useWorkout();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!workout) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-3">
			Workout id: {workout.id}
			<div className="flex flex-col gap-2">
				<div>Date: {workout.date}</div>
				<div>Duration: {workout.duration}</div>
				<div>User weight: {workout.userWeight}</div>
				<div>Notes: {workout.notes}</div>
			</div>
		</div>
	);
}
