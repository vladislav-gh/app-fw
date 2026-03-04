"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect } from "react";

import { Button } from "@Shared/ui";

import { signOut } from "../actions";

export type ButtonSignOutProps = ElProps<"form">;

export function ButtonSignOut({ ...restProps }: ButtonSignOutProps) {
	const [state, dispatchAction] = useActionState(signOut, null);

	useEffect(() => {
		console.log("sign out state:", state);
	}, [state]);

	return (
		<form action={dispatchAction} {...restProps}>
			<Button type="submit">Sign Out</Button>
		</form>
	);
}
