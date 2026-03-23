"use server";

import { createWorkout } from "@Entities/workout";

export async function addWorkoutAction() {
	const result = await createWorkout();

	return { success: true, data: result };
}
