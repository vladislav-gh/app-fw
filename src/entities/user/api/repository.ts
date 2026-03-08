import type { SupabaseClient } from "@supabase/supabase-js";
import type { User, UserRow } from "../model";

import { createSupabaseRepository } from "@Shared/api/supabase";

import { mapUser } from "../model";

export function createUserRepository(supabase: SupabaseClient) {
	const repository = createSupabaseRepository<UserRow, User>(supabase, "profiles", mapUser);

	return {
		...repository,
	};
}
