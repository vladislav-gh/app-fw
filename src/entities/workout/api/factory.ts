import { createClientServer } from "@Shared/api/supabase";

import { createWorkoutRepository } from "./repository";

export async function getWorkoutRepository() {
	const supabase = await createClientServer();

	return createWorkoutRepository(supabase);
}
