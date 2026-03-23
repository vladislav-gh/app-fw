"use server";

import { createExercise } from "@Entities/exercise";

export async function addExerciseAction(_prevState: unknown, formData: FormData) {
	const name = formData.get("name")?.toString().trim();
	const description = formData.get("description")?.toString().trim();
	const categoryIds = formData.getAll("categoryIds").filter(Boolean) as string[];

	if (!name) {
		return { success: false, error: "Missing name" };
	}

	return createExercise({ name, description, categoryIds: categoryIds.length ? categoryIds : undefined });
}
