"use server";

import type { ExerciseCreateDTO, ExerciseDeleteDTO, ExerciseGetUserDTO, ExerciseUpdateDTO } from "../model";

import { getExerciseRepository } from "./factory";

export async function getExercisesSystem() {
	const repo = await getExerciseRepository();

	return repo.getSystem();
}

export async function getExercisesUser({ userId }: ExerciseGetUserDTO) {
	const repo = await getExerciseRepository();

	return repo.getUser({ userId });
}

export async function createExercise({ userId, name, description, categoryIds }: ExerciseCreateDTO) {
	const repo = await getExerciseRepository();

	return repo.insert({
		payload: {
			user_id: userId,
			name,
			description,
			is_system: false,
		},
		categoryIds,
	});
}

export async function updateExercise({ exerciseId, name, description, categoryIds }: ExerciseUpdateDTO) {
	const repo = await getExerciseRepository();

	return repo.update({
		id: exerciseId,
		payload: {
			name,
			description,
		},
		categoryIds,
	});
}

export async function deleteExercise({ exerciseId }: ExerciseDeleteDTO) {
	const repo = await getExerciseRepository();

	return repo.delete({ id: exerciseId });
}
