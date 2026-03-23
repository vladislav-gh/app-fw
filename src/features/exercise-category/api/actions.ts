"use server";

import { createExerciseCategory } from "@Entities/exercise-category";

export async function addExerciseCategoryAction(_prevState: unknown, formData: FormData) {
	const name = formData.get("name")?.toString().trim();

	if (!name) {
		return { success: false, error: "Missing name" };
	}

	const result = await createExerciseCategory({ name });

	return { success: true, data: result };
}
