"use client";

import type { ElProps } from "@Shared/types";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useEffectEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { PAGES } from "@Shared/config";
import { Button } from "@Shared/ui";
import { cn } from "@Shared/utils";
import { useUser } from "@Entities/user";
import { QUERY_KEYS_WORKOUT } from "@Entities/workout";

import { addWorkoutAction } from "../api";

export type FormWorkoutAddProps = ElProps<"form">;

export function FormWorkoutAdd({ className, ...restProps }: FormWorkoutAddProps) {
	const [state, dispatchAction] = useActionState(addWorkoutAction, null);
	const router = useRouter();
	const queryClient = useQueryClient();
	const user = useUser();

	const handleSuccess = useEffectEvent(() => {
		if (user && state?.success && state.data) {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS_WORKOUT.all(user.id) });

			router.push(PAGES.workout(state.data.id));
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
			<Button type="submit">Add workout</Button>
		</form>
	);
}
