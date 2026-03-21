"use server";

import type { ExerciseCreateDTO, ExerciseDeleteDTO, ExerciseUpdateDTO } from "../model";

import { revalidatePath } from "next/cache";

import { getSupabaseUser } from "@Shared/api/supabase";
import { PAGES } from "@Shared/config";

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
	const result = await repo.insert({
		payload: {
			user_id: user.id,
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
