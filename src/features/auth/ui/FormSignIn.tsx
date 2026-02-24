"use client";

import { useActionState } from "react";

import { signIn } from "../actions";

export function FormSignIn() {
	const [_state, dispatchAction] = useActionState(signIn, null);

	return (
		<form className="flex flex-col gap-4" action={dispatchAction}>
			<input name="email" type="email" placeholder="Email" />
			<input name="password" type="password" placeholder="Password" />
			<button type="submit">Sign In</button>
		</form>
	);
}
