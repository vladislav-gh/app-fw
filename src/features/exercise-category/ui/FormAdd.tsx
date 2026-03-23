"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect, useEffectEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button, Input } from "@Shared/ui";
import { cn } from "@Shared/utils";
import { QUERY_KEYS_EXERCISE_CATEGORY } from "@Entities/exercise-category";
import { useUser } from "@Entities/user";

import { addExerciseCategoryAction } from "../api";

export type FormExerciseCategoryAddProps = ElProps<"form">;

export function FormExerciseCategoryAdd({ className, ...restProps }: FormExerciseCategoryAddProps) {
	const [state, dispatchAction] = useActionState(addExerciseCategoryAction, null);
	const queryClient = useQueryClient();
	const user = useUser();

	const handleSuccess = useEffectEvent(() => {
		if (user && state?.success && state.data) {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS_EXERCISE_CATEGORY.user(user.id) });
		}
	});

	useEffect(() => {
		handleSuccess();
	}, [state]);

	if (!user) {
		return null;
	}

	return (
		<form className={cn("flex flex-col gap-4", className)} action={dispatchAction} {...restProps}>
			<Input name="name" placeholder="Enter category name" />

			<Button type="submit">Add category</Button>
		</form>
	);
}
