"use server";

import type { ExerciseCategoryCreateDTO, ExerciseCategoryDeleteDTO, ExerciseCategoryUpdateDTO } from "../model";

import { getSupabaseUser } from "@Shared/api/supabase";

import { getExerciseCategoryRepository } from "./factory";

export async function getExerciseCategoriesSystem() {
	const repo = await getExerciseCategoryRepository({ public: true });

	return repo.getSystem();
}

export async function getExerciseCategoriesUser() {
	const user = await getSupabaseUser();
	const repo = await getExerciseCategoryRepository();

	return repo.getUser({ userId: user.id });
}

export async function createExerciseCategory({ name }: ExerciseCategoryCreateDTO) {
	const user = await getSupabaseUser();
	const repo = await getExerciseCategoryRepository();

	return await repo.insert({ payload: { user_id: user.id, name, is_system: false } });
}

export async function updateExerciseCategory({ categoryId, name }: ExerciseCategoryUpdateDTO) {
	const repo = await getExerciseCategoryRepository();

	return await repo.update({ id: categoryId, payload: { name } });
}

export async function deleteExerciseCategory({ categoryId }: ExerciseCategoryDeleteDTO) {
	const repo = await getExerciseCategoryRepository();

	return await repo.delete({ id: categoryId });
}
