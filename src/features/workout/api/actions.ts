"use server";

import { createWorkout, createWorkoutExercise } from "@Entities/workout";

export async function addWorkoutAction() {
	const result = await createWorkout();

	return { success: true, data: result };
}

export async function addWorkoutExerciseAction(_prevState: unknown, formData: FormData) {
	const workoutId = formData.get("workoutId")?.toString().trim();
	const exerciseId = formData.get("exerciseId")?.toString().trim();
	const name = formData.get("name")?.toString().trim();
	const categories = formData.get("categories")?.toString().trim();

	if (!workoutId) {
		return { success: false, error: "Missing workout id" };
	}

	if (!name) {
		return { success: false, error: "Missing name" };
	}

	const result = await createWorkoutExercise({
		workoutId,
		exerciseId,
		name,
		categories: categories ? JSON.parse(categories) : undefined,
	});

	return { success: true, data: result };
}
