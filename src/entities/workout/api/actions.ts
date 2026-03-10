"use server";

import type {
	WorkoutCreateDTO,
	WorkoutDeleteDTO,
	WorkoutExerciseCreateDTO,
	WorkoutExerciseDeleteDTO,
	WorkoutExerciseSetCreateDTO,
	WorkoutExerciseSetDeleteDTO,
	WorkoutExerciseSetUpdateDTO,
	WorkoutExerciseUpdateDTO,
	WorkoutGetDTO,
	WorkoutUpdateDTO,
} from "../model";

import { getWorkoutExerciseRepository, getWorkoutExerciseSetRepository, getWorkoutRepository } from "./factory";

export async function getWorkouts() {
	const repo = await getWorkoutRepository();

	return repo.getAll();
}

export async function getWorkout({ workoutId }: WorkoutGetDTO) {
	const repo = await getWorkoutRepository();

	return repo.getById({ id: workoutId });
}

export async function createWorkout({ userId, date, duration, userWeight, notes }: WorkoutCreateDTO) {
	const repo = await getWorkoutRepository();

	return repo.insert({
		payload: {
			user_id: userId,
			user_weight: userWeight,
			date,
			duration,
			notes,
		},
	});
}

export async function updateWorkout({ workoutId, date, duration, userWeight, notes }: WorkoutUpdateDTO) {
	const repo = await getWorkoutRepository();

	return repo.update({ id: workoutId, payload: { date, duration, user_weight: userWeight, notes } });
}

export async function deleteWorkout({ workoutId }: WorkoutDeleteDTO) {
	const repo = await getWorkoutRepository();

	return repo.delete({ id: workoutId });
}

export async function createWorkoutExercise({ workoutId, name, categories }: WorkoutExerciseCreateDTO) {
	const repo = await getWorkoutExerciseRepository();

	return repo.insert({
		payload: {
			workout_id: workoutId,
			name,
			categories: categories ? JSON.parse(JSON.stringify(categories)) : undefined,
		},
	});
}

export async function updateWorkoutExercise({ exerciseId, name, categories }: WorkoutExerciseUpdateDTO) {
	const repo = await getWorkoutExerciseRepository();

	return repo.update({
		id: exerciseId,
		payload: { name, categories: categories ? JSON.parse(JSON.stringify(categories)) : undefined },
	});
}

export async function deleteWorkoutExercise({ exerciseId }: WorkoutExerciseDeleteDTO) {
	const repo = await getWorkoutExerciseRepository();

	return repo.delete({ id: exerciseId });
}

export async function createWorkoutExerciseSet({ exerciseId, reps, weight }: WorkoutExerciseSetCreateDTO) {
	const repo = await getWorkoutExerciseSetRepository();

	return repo.insert({ payload: { workout_exercise_id: exerciseId, reps, weight } });
}

export async function updateWorkoutExerciseSet({ setId, reps, weight }: WorkoutExerciseSetUpdateDTO) {
	const repo = await getWorkoutExerciseSetRepository();

	return repo.update({ id: setId, payload: { reps, weight } });
}

export async function deleteWorkoutExerciseSet({ setId }: WorkoutExerciseSetDeleteDTO) {
	const repo = await getWorkoutExerciseSetRepository();

	return repo.delete({ id: setId });
}
