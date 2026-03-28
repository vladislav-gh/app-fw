"use server";

import { getZodFieldErrors } from "@Shared/utils";

import { ForgotPasswordSchema, SignInSchema, SignUpSchema } from "../model";
import { forgotPassword, signIn, signOut, signUp } from "./service";

export async function signUpAction(_prevState: unknown, formData: FormData) {
	const schemaResult = SignUpSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!schemaResult.success) {
		return {
			success: false,
			fields: getZodFieldErrors(schemaResult.error),
		};
	}

	return signUp(schemaResult.data);
}

export async function signInAction(_prevState: unknown, formData: FormData) {
	const schemaResult = SignInSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!schemaResult.success) {
		return {
			success: false,
			fields: getZodFieldErrors(schemaResult.error),
		};
	}

	return signIn(schemaResult.data);
}

export async function forgotPasswordAction(_prevState: unknown, formData: FormData) {
	const schemaResult = ForgotPasswordSchema.safeParse({
		email: formData.get("email"),
	});

	if (!schemaResult.success) {
		return {
			success: false,
			fields: getZodFieldErrors(schemaResult.error),
		};
	}

	return forgotPassword(schemaResult.data);
}

export async function signOutAction() {
	return signOut();
}
