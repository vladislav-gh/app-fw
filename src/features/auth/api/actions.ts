"use server";

import { forgotPassword, signIn, signOut, signUp } from "./service";

export async function signUpAction(_prevState: unknown, formData: FormData) {
	const email = formData.get("email")?.toString().trim();
	const password = formData.get("password")?.toString().trim();

	if (!email || !password) {
		return { success: false, error: "Missing email or password" };
	}

	return signUp({ email, password });
}

export async function signInAction(_prevState: unknown, formData: FormData) {
	const email = formData.get("email")?.toString().trim();
	const password = formData.get("password")?.toString().trim();

	if (!email || !password) {
		return { success: false, error: "Missing email or password" };
	}

	return signIn({ email, password });
}

export async function forgotPasswordAction(_prevState: unknown, formData: FormData) {
	const email = formData.get("email")?.toString().trim();

	if (!email) {
		return { success: false, error: "Missing email" };
	}

	return forgotPassword({ email });
}

export async function signOutAction() {
	return signOut();
}
