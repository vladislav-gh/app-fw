import * as z from "zod";

export const SignUpSchema = z.object({
	email: z.email().trim(),
	password: z.string().min(8).trim(),
});

export const SignInSchema = z.object({
	email: z.email().trim(),
	password: z.string().min(1).trim(),
});

export const ForgotPasswordSchema = z.object({
	email: z.email().trim(),
});
