import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

import { createBrowserClient } from "@supabase/ssr";

import { SUPABASE_KEY, SUPABASE_URL } from "./config";

let client: SupabaseClient<Database> | undefined;

export const createClientBrowser = () => {
	if (!client) {
		client = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_KEY);
	}

	return client;
};
