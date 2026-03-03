"use client";

import { useActionState, useEffect } from "react";

import { forgotPassword } from "../actions";

export function FormForgotPassword() {
	const [state, dispatchAction] = useActionState(forgotPassword, null);

	useEffect(() => {
		console.log("forgot password state:", state);
	}, [state]);

	return (
		<form className="flex flex-col gap-4" action={dispatchAction}>
			<input name="email" type="email" placeholder="Email" />
			<button type="submit">Send</button>
		</form>
	);
}
