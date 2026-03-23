"use server";

import type { ExerciseCreateDTO, ExerciseDeleteDTO, ExerciseUpdateDTO } from "../model";

import { getSupabaseUser } from "@Shared/api/supabase";

import { getExerciseRepository } from "./factory";

export async function getExercisesSystem() {
	const repo = await getExerciseRepository({ public: true });

	return repo.getSystem();
}

export async function getExercisesUser() {
	const user = await getSupabaseUser();
	const repo = await getExerciseRepository();

	return repo.getUser({ userId: user.id });
}

export async function createExercise({ name, description, categoryIds }: ExerciseCreateDTO) {
	const user = await getSupabaseUser();
	const repo = await getExerciseRepository();

	return await repo.insert({
		payload: {
			user_id: user.id,
			name,
			description,
			is_system: false,
		},
		categoryIds,
	});
}

export async function updateExercise({ exerciseId, name, description, categoryIds }: ExerciseUpdateDTO) {
	const repo = await getExerciseRepository();

	return await repo.update({
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

	return await repo.delete({ id: exerciseId });
}
