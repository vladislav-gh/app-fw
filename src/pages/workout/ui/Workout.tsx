"use client";

import { notFound } from "next/navigation";

import { Badge } from "@Shared/ui";
import { useWorkout } from "@Entities/workout";
import { FormWorkoutExerciseAdd, FormWorkoutExerciseSetAdd } from "@Features/workout";

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
			<div>Workout id: {workout.id}</div>

			<div className="flex flex-col gap-2">
				<div>Date: {workout.date}</div>
				<div>Duration: {workout.duration}</div>
				<div>User weight: {workout.userWeight}</div>
				<div>Notes: {workout.notes}</div>
			</div>

			{!!workout.categories.length && (
				<div className="flex items-center flex-wrap gap-1">
					{workout.categories.map(category => (
						<Badge key={category} variant="secondary">
							{category}
						</Badge>
					))}
				</div>
			)}

			{workout.exercises.map(exercise => (
				<div key={exercise.id}>
					{exercise.name}

					{!!exercise.categories.length && (
						<div className="flex items-center flex-wrap gap-1">
							{exercise.categories.map(category => (
								<Badge key={category.id} variant="secondary">
									{category.name}
								</Badge>
							))}
						</div>
					)}

					{!!exercise.sets.length && (
						<div>
							{exercise.sets.map(set => (
								<div key={set.id}>
									<div>Reps: {set.reps}</div>
									<div>Weight: {set.weight}</div>
								</div>
							))}
						</div>
					)}

					<FormWorkoutExerciseSetAdd exerciseId={exercise.id} />
				</div>
			))}

			<FormWorkoutExerciseAdd />
		</div>
	);
}
