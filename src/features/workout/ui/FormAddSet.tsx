"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect, useEffectEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button, Input } from "@Shared/ui";
import { cn } from "@Shared/utils";
import { QUERY_KEYS_WORKOUT, useWorkout } from "@Entities/workout";

import { addWorkoutExerciseSetAction } from "../api";

export interface FormWorkoutExerciseSetAddProps extends ElProps<"form"> {
	exerciseId: string;
}

export function FormWorkoutExerciseSetAdd({ className, exerciseId, ...restProps }: FormWorkoutExerciseSetAddProps) {
	const [state, dispatchAction] = useActionState(addWorkoutExerciseSetAction, null);
	const queryClient = useQueryClient();
	const { workout } = useWorkout();

	const handleSuccess = useEffectEvent(() => {
		if (workout && state?.success && state.data) {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS_WORKOUT.workout(workout.id) });
		}
	});

	useEffect(() => {
		handleSuccess();
	}, [state]);

	return (
		<form className={cn("flex flex-col gap-4", className)} action={dispatchAction} {...restProps}>
			<input type="hidden" name="exerciseId" value={exerciseId} />

			<Input type="number" name="reps" placeholder="Enter reps" />
			<Input type="number" name="weight" placeholder="Enter weight" />

			<Button>Add set</Button>
		</form>
	);
}
