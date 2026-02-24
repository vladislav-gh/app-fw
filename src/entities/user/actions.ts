"use server";

import { createClientServer } from "@Shared/api/supabase";

export async function getUser() {
	const sb = await createClientServer();
	const { data } = await sb.auth.getUser();

	return data.user;
}
