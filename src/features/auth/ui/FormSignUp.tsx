"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect } from "react";

import { Button, Input } from "@Shared/ui";
import { cn } from "@Shared/utils";

import { signUp } from "../actions";

export type FormSingUpProps = ElProps<"form">;

export function FormSignUp({ className, ...restProps }: FormSingUpProps) {
	const [state, dispatchAction] = useActionState(signUp, null);

	useEffect(() => {
		console.log("sign up state:", state);
	}, [state]);

	return (
		<form className={cn("flex flex-col gap-4", className)} action={dispatchAction} {...restProps}>
			<Input name="email" type="email" placeholder="Email" />
			<Input name="password" type="password" placeholder="Password" />

			<Button type="submit">Sign Up</Button>
		</form>
	);
}
