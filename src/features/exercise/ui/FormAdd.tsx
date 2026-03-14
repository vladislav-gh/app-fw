"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect } from "react";

import { Button, Input, Textarea } from "@Shared/ui";
import { cn } from "@Shared/utils";

import { addExerciseAction } from "../api";

export type FormExerciseAddProps = ElProps<"form">;

export function FormExerciseAdd({ className, ...restProps }: FormExerciseAddProps) {
	const [state, dispatchAction] = useActionState(addExerciseAction, null);

	useEffect(() => {
		console.log("add exercise state:", state);
	}, [state]);

	return (
		<form className={cn("flex flex-col gap-4", className)} action={dispatchAction} {...restProps}>
			<Input name="name" placeholder="Enter category name" />
			<Textarea name="description" placeholder="Enter category description" />

			<Button type="submit">Add exercise</Button>
		</form>
	);
}
