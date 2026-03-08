import { createClientServer } from "@Shared/api/supabase";

import { createUserRepository } from "./repository";

export async function getUserRepository() {
	const supabase = await createClientServer();

	return createUserRepository(supabase);
}
