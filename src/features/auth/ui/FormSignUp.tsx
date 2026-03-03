"use client";

import { useActionState, useEffect } from "react";

import { signUp } from "../actions";

export function FormSignUp() {
	const [state, dispatchAction] = useActionState(signUp, null);

	useEffect(() => {
		console.log("sign up state:", state);
	}, [state]);

	return (
		<form className="flex flex-col gap-4" action={dispatchAction}>
			<input name="email" type="email" placeholder="Email" />
			<input name="password" type="password" placeholder="Password" />
			<button type="submit">Sign Up</button>
		</form>
	);
}
