"use server";

import type {
	ExerciseCategoryCreateDTO,
	ExerciseCategoryDeleteDTO,
	ExerciseCategoryGetUserDTO,
	ExerciseCategoryUpdateDTO,
} from "../model";

import { revalidatePath } from "next/cache";

import { PAGES } from "@Shared/config";

import { getExerciseCategoryRepository } from "./factory";

export async function getExerciseCategoriesSystem() {
	const repo = await getExerciseCategoryRepository();

	return repo.getSystem();
}

export async function getExerciseCategoriesUser({ userId }: ExerciseCategoryGetUserDTO) {
	const repo = await getExerciseCategoryRepository();

	return repo.getUser({ userId });
}

export async function createExerciseCategory({ userId, name }: ExerciseCategoryCreateDTO) {
	const repo = await getExerciseCategoryRepository();

	const result = await repo.insert({ payload: { user_id: userId, name, is_system: false } });

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
