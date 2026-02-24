"use client";

import { useActionState } from "react";

import { forgotPassword } from "../actions";

export function FormForgotPassword() {
	const [_state, dispatchAction] = useActionState(forgotPassword, null);

	return (
		<form className="flex flex-col gap-4" action={dispatchAction}>
			<input name="email" type="email" placeholder="Email" />
			<button type="submit">Send</button>
		</form>
	);
}
