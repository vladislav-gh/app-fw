import { createClientBrowser, createClientServer } from "@Shared/api/supabase";
import { IS_SERVER } from "@Shared/config";

import {
	createWorkoutExerciseRepository,
	createWorkoutExerciseSetRepository,
	createWorkoutRepository,
} from "./repository";

export async function getWorkoutRepository() {
	const supabase = IS_SERVER ? await createClientServer() : createClientBrowser();

	return createWorkoutRepository(supabase);
}

export async function getWorkoutExerciseRepository() {
	const supabase = IS_SERVER ? await createClientServer() : createClientBrowser();

	return createWorkoutExerciseRepository(supabase);
}

export async function getWorkoutExerciseSetRepository() {
	const supabase = IS_SERVER ? await createClientServer() : createClientBrowser();

	return createWorkoutExerciseSetRepository(supabase);
}
