"use client";

import { useActionState, useEffect } from "react";

import { signIn } from "../actions";

export function FormSignIn() {
	const [state, dispatchAction] = useActionState(signIn, null);

	useEffect(() => {
		console.log("sign in state:", state);
	}, [state]);

	return (
		<form className="flex flex-col gap-4" action={dispatchAction}>
			<input name="email" type="email" placeholder="Email" />
			<input name="password" type="password" placeholder="Password" />
			<button type="submit">Sign In</button>
		</form>
	);
}
