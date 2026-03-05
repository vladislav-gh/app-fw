import { getExerciseCategoryRepository } from "./factory";

export async function getExerciseCategoriesSystem() {
	const repo = await getExerciseCategoryRepository();

	return repo.getSystem();
}

export async function getExerciseCategoriesUser(userId: string) {
	const repo = await getExerciseCategoryRepository();

	return repo.getUser(userId);
}

export async function createExerciseCategory(userId: string, name: string) {
	const repo = await getExerciseCategoryRepository();

	return repo.insert({ user_id: userId, name, is_system: false });
}

export async function updateExerciseCategory(categoryId: string, name: string) {
	const repo = await getExerciseCategoryRepository();

	return repo.update(categoryId, { name });
}

export async function deleteExerciseCategory(categoryId: string) {
	const repo = await getExerciseCategoryRepository();

	return repo.delete(categoryId);
}
