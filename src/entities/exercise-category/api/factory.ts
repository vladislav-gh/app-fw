import { createClientBrowser, createClientServer } from "@Shared/api/supabase";
import { IS_SERVER } from "@Shared/config";

import { createExerciseCategoryRepository } from "./repository";

export async function getExerciseCategoryRepository() {
	const supabase = IS_SERVER ? await createClientServer() : createClientBrowser();

	return createExerciseCategoryRepository(supabase);
}
