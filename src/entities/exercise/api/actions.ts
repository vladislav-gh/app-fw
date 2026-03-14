"use server";

import type { ExerciseCreateDTO, ExerciseDeleteDTO, ExerciseGetUserDTO, ExerciseUpdateDTO } from "../model";

import { revalidatePath } from "next/cache";

import { PAGES } from "@Shared/config";

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
	const result = await repo.insert({
		payload: {
			user_id: userId,
			name,
			description,
			is_system: false,
		},
		categoryIds,
	});

	revalidatePath(PAGES.exercises);

	return result;
}

export async function updateExercise({ exerciseId, name, description, categoryIds }: ExerciseUpdateDTO) {
	const repo = await getExerciseRepository();
	const result = await repo.update({
		id: exerciseId,
		payload: {
			name,
			description,
		},
		categoryIds,
	});

	revalidatePath(PAGES.exercises);

	return result;
}

export async function deleteExercise({ exerciseId }: ExerciseDeleteDTO) {
	const repo = await getExerciseRepository();
	const result = await repo.delete({ id: exerciseId });

	revalidatePath(PAGES.exercises);

	return result;
}
