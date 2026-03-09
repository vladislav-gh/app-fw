import { createClientServer } from "@Shared/api/supabase";

import { createWorkoutRepository } from "./repository";

export async function getWorkoutRepository() {
	const supabase = await createClientServer();

	return createWorkoutRepository(supabase);
}

export async function getWorkoutExerciseRepository() {
	const supabase = await createClientServer();

	return createWorkoutRepository(supabase);
}

export async function getWorkoutExerciseSetRepository() {
	const supabase = await createClientServer();

	return createWorkoutRepository(supabase);
}
