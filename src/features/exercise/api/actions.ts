"use server";

import { createExercise } from "@Entities/exercise";
import { getUser } from "@Entities/user";

export async function addExerciseAction(_prevState: unknown, formData: FormData) {
	const name = formData.get("name")?.toString().trim();
	const description = formData.get("description")?.toString().trim();

	if (!name) {
		return { success: false, error: "Missing name" };
	}

	const user = await getUser();

	if (!user) {
		return { success: false, error: "Unauthorized" };
	}

	return createExercise({ userId: user.id, name, description });
}
