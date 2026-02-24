"use server";

import { createClientServer } from "@Shared/api/supabase";

export async function signUp(_prevState: unknown, formData: FormData) {
	const email = formData.get("email")?.toString().trim();
	const password = formData.get("password")?.toString().trim();

	if (!email || !password) {
		return { success: false, error: "Missing email or password" };
	}

	const sb = await createClientServer();

	const { error } = await sb.auth.signUp({ email, password });

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}

export async function signIn(_prevState: unknown, formData: FormData) {
	const email = formData.get("email")?.toString().trim();
	const password = formData.get("password")?.toString().trim();

	if (!email || !password) {
		return { success: false, error: "Missing email or password" };
	}

	const sb = await createClientServer();

	const { error } = await sb.auth.signInWithPassword({ email, password });

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}

export async function forgotPassword(_prevState: unknown, formData: FormData) {
	const email = formData.get("email")?.toString().trim();

	if (!email) {
		return { success: false, error: "Missing email" };
	}

	const sb = await createClientServer();

	const { error } = await sb.auth.resetPasswordForEmail(email);

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}

export async function signOut() {
	const sb = await createClientServer();

	const { error } = await sb.auth.signOut();

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}
