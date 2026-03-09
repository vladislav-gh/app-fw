import type { ForgotPasswordDTO, SignInDTO, SignUpDTO } from "../model";

import { createClientServer } from "@Shared/api/supabase";

export async function signUp({ email, password }: SignUpDTO) {
	const sb = await createClientServer();

	const { error } = await sb.auth.signUp({ email, password });

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}

export async function signIn({ email, password }: SignInDTO) {
	const sb = await createClientServer();

	const { error } = await sb.auth.signInWithPassword({ email, password });

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}

export async function forgotPassword({ email }: ForgotPasswordDTO) {
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
