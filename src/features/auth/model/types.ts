import type * as z from "zod";
import type { ForgotPasswordSchema, SignInSchema, SignUpSchema } from "./schemas";

export type SignUpDTO = z.infer<typeof SignUpSchema>;

export type SignInDTO = z.infer<typeof SignInSchema>;

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
