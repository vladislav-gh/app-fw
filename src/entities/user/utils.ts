import { createClientBrowser, createClientServer } from "@Shared/api/supabase";
import { IS_SERVER } from "@Shared/config";

export async function getUserFromSupabase() {
	const supabase = IS_SERVER ? await createClientServer() : createClientBrowser();

	const { data } = await supabase.auth.getUser();

	return data.user;
}
