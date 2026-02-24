"use client";

import { useActionState } from "react";

import { signOut } from "../actions";

export function ButtonSignOut() {
	const [_state, dispatchAction] = useActionState(signOut, null);

	return (
		<form action={dispatchAction}>
			<button type="submit">Sign Out</button>
		</form>
	);
}
