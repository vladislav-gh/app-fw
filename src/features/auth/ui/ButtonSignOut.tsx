"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "@Shared/i18n";
import { Button } from "@Shared/ui";

import { signOutAction } from "../api";

export type ButtonSignOutProps = ElProps<"form">;

export function ButtonSignOut({ ...restProps }: ButtonSignOutProps) {
	const router = useRouter();
	const [state, dispatchAction] = useActionState(signOutAction, null);
	const queryClient = useQueryClient();

	useEffect(() => {
		console.log("sign out state:", state);

		if (state?.success) {
			queryClient.clear();
			router.refresh();
		}
	}, [state]);

	return (
		<form action={dispatchAction} {...restProps}>
			<Button type="submit">Sign Out</Button>
		</form>
	);
}
