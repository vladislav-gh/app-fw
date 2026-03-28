"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "@Shared/i18n";
import { Button, Input } from "@Shared/ui";
import { cn } from "@Shared/utils";

import { signInAction } from "../api";

export type FormSingInProps = ElProps<"form">;

export function FormSignIn({ className, ...restProps }: FormSingInProps) {
	const router = useRouter();
	const [state, dispatchAction] = useActionState(signInAction, null);
	const queryClient = useQueryClient();

	useEffect(() => {
		console.log("sign in state:", state);

		if (state?.success) {
			queryClient.invalidateQueries();
			router.refresh();
		}
	}, [state]);

	return (
		<form className={cn("flex flex-col gap-4", className)} action={dispatchAction} {...restProps}>
			<Input name="email" type="email" placeholder="Email" />
			<Input name="password" type="password" placeholder="Password" />

			<Button type="submit">Sign In</Button>
		</form>
	);
}
