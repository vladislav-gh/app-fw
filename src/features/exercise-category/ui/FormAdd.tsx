"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect } from "react";

import { Button, Input } from "@Shared/ui";
import { cn } from "@Shared/utils";

import { addExerciseCategoryAction } from "../api";

export type FormExerciseCategoryAddProps = ElProps<"form">;

export function FormExerciseCategoryAdd({ className, ...restProps }: FormExerciseCategoryAddProps) {
	const [state, dispatchAction] = useActionState(addExerciseCategoryAction, null);

	useEffect(() => {
		console.log("add category state:", state);
	}, [state]);

	return (
		<form className={cn("flex flex-col gap-4", className)} action={dispatchAction} {...restProps}>
			<Input name="name" placeholder="Enter category name" />

			<Button type="submit">Add category</Button>
		</form>
	);
}
