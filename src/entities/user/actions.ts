"use server";

import { createClientServer } from "@Shared/api/supabase";

export async function getUser() {
	const sb = await createClientServer();
	const { data } = await sb.auth.getUser();

	if (!data.user) {
		return null;
	}

	const profile = await sb.from("profiles").select("*").eq("id", data.user.id).single();

	if (!profile.data) {
		return null;
	}

	return profile.data;
}
