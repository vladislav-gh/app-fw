import { createClientBrowser, createClientServer } from "@Shared/api/supabase";
import { IS_SERVER } from "@Shared/config";

import { createUserRepository } from "./repository";

export async function getUserRepository() {
	const supabase = IS_SERVER ? await createClientServer() : createClientBrowser();

	return createUserRepository(supabase);
}
