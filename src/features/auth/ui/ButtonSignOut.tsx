"use client";

import { useActionState, useEffect } from "react";

import { signOut } from "../actions";

export function ButtonSignOut() {
	const [state, dispatchAction] = useActionState(signOut, null);

	useEffect(() => {
		console.log("sign out state:", state);
	}, [state]);

	return (
		<form action={dispatchAction}>
			<button type="submit">Sign Out</button>
		</form>
	);
}
