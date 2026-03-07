import { createClientServer } from "@Shared/api/supabase";

import { createExerciseRepository } from "./repository";

export async function getExerciseRepository() {
	const supabase = await createClientServer();

	return createExerciseRepository(supabase);
}
