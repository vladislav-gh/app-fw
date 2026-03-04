"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect } from "react";

import { Button, Input } from "@Shared/ui";
import { cn } from "@Shared/utils";

import { forgotPassword } from "../actions";

export type FormForgotPasswordProps = ElProps<"form">;

export function FormForgotPassword({ className, ...restProps }: FormForgotPasswordProps) {
	const [state, dispatchAction] = useActionState(forgotPassword, null);

	useEffect(() => {
		console.log("forgot password state:", state);
	}, [state]);

	return (
		<form className={cn("flex flex-col gap-4", className)} action={dispatchAction} {...restProps}>
			<Input name="email" type="email" placeholder="Email" />

			<Button type="submit">Send</Button>
		</form>
	);
}
