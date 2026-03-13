"use server";

import { createExerciseCategory } from "@Entities/exercise-category";
import { getUser } from "@Entities/user";

export async function addExerciseCategoryAction(_prevState: unknown, formData: FormData) {
	const name = formData.get("name")?.toString().trim();

	if (!name) {
		return { success: false, error: "Missing name" };
	}

	const user = await getUser();

	if (!user) {
		return { success: false, error: "Unauthorized" };
	}

	return createExerciseCategory({ userId: user.id, name });
}
