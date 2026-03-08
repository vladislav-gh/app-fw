import { createClientServer } from "@Shared/api/supabase";

export async function getUserFromSupabase() {
	const supabase = await createClientServer();

	const { data } = await supabase.auth.getUser();

	return data.user;
}
