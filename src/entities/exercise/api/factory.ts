import { createClientBrowser, createClientServer } from "@Shared/api/supabase";
import { IS_SERVER } from "@Shared/config";

import { createExerciseRepository } from "./repository";

export async function getExerciseRepository() {
	const supabase = IS_SERVER ? await createClientServer() : createClientBrowser();

	return createExerciseRepository(supabase);
}
