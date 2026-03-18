import { IS_SERVER } from "@Shared/config";

import { createClientBrowser } from "./client";
import { createClientServer } from "./server";

export async function getSupabaseUser() {
	const supabase = IS_SERVER ? await createClientServer() : createClientBrowser();

	const { data, error } = await supabase.auth.getUser();

	if (error) throw error;

	return data.user;
}
