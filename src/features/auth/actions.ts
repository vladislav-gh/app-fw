"use server";

import { createClientServer } from "@Shared/api/supabase";

export async function signIn(formData: FormData) {
	const sb = await createClientServer();
	const email = formData.get("email")?.toString().trim();
	const password = formData.get("password")?.toString().trim();

	if (!email || !password) {
		return { success: false, error: "Missing email or password" };
	}

	const { error } = await sb.auth.signInWithPassword({ email, password });

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}
