"use server";

import { createWorkout, createWorkoutExercise, createWorkoutExerciseSet } from "@Entities/workout";

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

export async function addWorkoutExerciseSetAction(_prevState: unknown, formData: FormData) {
	const exerciseId = formData.get("exerciseId")?.toString().trim();
	const reps = formData.get("reps")?.toString().trim();
	const weight = formData.get("weight")?.toString().trim();

	if (!exerciseId) {
		return { success: false, error: "Missing exercise id" };
	}

	if (!reps) {
		return { success: false, error: "Missing reps" };
	}

	const result = await createWorkoutExerciseSet({
		exerciseId,
		reps: Number(reps),
		weight: weight ? Number(weight) : undefined,
	});

	return { success: true, data: result };
}
