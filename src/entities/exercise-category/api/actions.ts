"use server";

import type { ExerciseCategoryCreateDTO, ExerciseCategoryDeleteDTO, ExerciseCategoryUpdateDTO } from "../model";

import { revalidatePath } from "next/cache";

import { getSupabaseUser } from "@Shared/api/supabase";
import { PAGES } from "@Shared/config";

import { getExerciseCategoryRepository } from "./factory";

export async function getExerciseCategoriesSystem() {
	const repo = await getExerciseCategoryRepository();

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

	const result = await repo.insert({ payload: { user_id: user.id, name, is_system: false } });

	revalidatePath(PAGES.exerciseCategories);

	return result;
}

export async function updateExerciseCategory({ categoryId, name }: ExerciseCategoryUpdateDTO) {
	const repo = await getExerciseCategoryRepository();
	const result = await repo.update({ id: categoryId, payload: { name } });

	revalidatePath(PAGES.exerciseCategories);

	return result;
}

export async function deleteExerciseCategory({ categoryId }: ExerciseCategoryDeleteDTO) {
	const repo = await getExerciseCategoryRepository();
	const result = await repo.delete({ id: categoryId });

	revalidatePath(PAGES.exerciseCategories);

	return result;
}
