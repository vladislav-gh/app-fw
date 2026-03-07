import type {
	ExerciseCategoryCreateDTO,
	ExerciseCategoryDeleteDTO,
	ExerciseCategoryGetUserDTO,
	ExerciseCategoryUpdateDTO,
} from "../model";

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

	return repo.insert({ payload: { user_id: userId, name, is_system: false } });
}

export async function updateExerciseCategory({ categoryId, name }: ExerciseCategoryUpdateDTO) {
	const repo = await getExerciseCategoryRepository();

	return repo.update({ id: categoryId, payload: { name } });
}

export async function deleteExerciseCategory({ categoryId }: ExerciseCategoryDeleteDTO) {
	const repo = await getExerciseCategoryRepository();

	return repo.delete({ id: categoryId });
}
