import type { SupabaseClient } from "@supabase/supabase-js";

import { IS_SERVER } from "@Shared/config";

import { createClientBrowser } from "./client";
import { createClientPublic } from "./public";
import { createClientServer } from "./server";

interface GetRepositoryOptions {
	public?: boolean;
}

export function getSupabaseRepository<T>(createRepositoryFn: (client: SupabaseClient) => T) {
	return async (options: GetRepositoryOptions = {}) => {
		let supabase: SupabaseClient;

		if (IS_SERVER) {
			supabase = options.public ? createClientPublic() : await createClientServer();
		} else {
			supabase = createClientBrowser();
		}

		return createRepositoryFn(supabase);
	};
}
