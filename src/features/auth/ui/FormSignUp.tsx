"use client";

import { useActionState } from "react";

import { signUp } from "../actions";

export function FormSignUp() {
	const [_state, dispatchAction] = useActionState(signUp, null);

	return (
		<form className="flex flex-col gap-4" action={dispatchAction}>
			<input name="email" type="email" placeholder="Email" />
			<input name="password" type="password" placeholder="Password" />
			<button type="submit">Sign Up</button>
		</form>
	);
}
