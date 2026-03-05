import { createClientServer } from "@Shared/api/supabase";

import { createExerciseCategoryRepository } from "./repository";

export async function getExerciseCategoryRepository() {
	const supabase = await createClientServer();

	return createExerciseCategoryRepository(supabase);
}
