"use server";

import { createWorkout } from "@Entities/workout";

export async function addWorkoutAction(_prevState: unknown, formData: FormData) {
	const userWeight = formData.get("userWeight")?.toString().trim();
	const notes = formData.get("notes")?.toString().trim();

	const result = await createWorkout({ userWeight: userWeight ? Number(userWeight) : undefined, notes });

	return { success: true, data: result };
}
