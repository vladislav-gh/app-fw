"use client";

import type { ElProps } from "@Shared/types";
import type { ChangeEvent } from "react";

import { useTranslations } from "next-intl";
import { useActionState, useEffect, useEffectEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button, NativeSelect, NativeSelectOption } from "@Shared/ui";
import { cn } from "@Shared/utils";
import { useExercisesAll } from "@Entities/exercise";
import { QUERY_KEYS_WORKOUT, useWorkout } from "@Entities/workout";

import { addWorkoutExerciseAction } from "../api";

export type FormWorkoutExerciseAddProps = ElProps<"form">;

export function FormWorkoutExerciseAdd({ className, ...restProps }: FormWorkoutExerciseAddProps) {
	const [valueExerciseId, setValueExerciseId] = useState("");
	const [valueName, setValueName] = useState("");
	const [valueCategories, setValueCategories] = useState("");

	const tExercise = useTranslations("exercises");
	const tExerciseCategories = useTranslations("exerciseCategories");
	const [state, dispatchAction] = useActionState(addWorkoutExerciseAction, null);
	const queryClient = useQueryClient();
	const exercises = useExercisesAll();
	const { workout } = useWorkout();

	const handleChangeSelectExercise = (e: ChangeEvent<HTMLSelectElement>) => {
		const exercise = exercises.find(exercise => exercise.id === e.target.value);

		if (!exercise) {
			return;
		}

		setValueExerciseId(exercise.id);
		setValueName(String(exercise.slug ? tExercise(exercise.slug as Parameters<typeof tExercise>[0]) : exercise.name));
		setValueCategories(
			JSON.stringify(
				exercise.categories.map(category => ({
					id: category.id,
					name: String(
						category.slug
							? tExerciseCategories(category.slug as Parameters<typeof tExerciseCategories>[0])
							: category.name,
					),
				})),
			),
		);
	};

	const handleSuccess = useEffectEvent(() => {
		if (workout && state?.success && state.data) {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS_WORKOUT.workout(workout.id) });

			setValueExerciseId("");
			setValueName("");
			setValueCategories("");
		}
	});

	useEffect(() => {
		handleSuccess();
	}, [state]);

	return (
		<form className={cn("flex flex-col gap-4", className)} action={dispatchAction} {...restProps}>
			<input type="hidden" name="workoutId" value={workout?.id} />
			<input type="hidden" name="exerciseId" value={valueExerciseId} />
			<input type="hidden" name="name" value={valueName} />
			<input type="hidden" name="categories" value={valueCategories} />

			<NativeSelect wrapperClassName="w-full" onChange={handleChangeSelectExercise}>
				<NativeSelectOption value="">Select exercise</NativeSelectOption>

				{exercises.map(exercise => (
					<NativeSelectOption key={exercise.id} value={exercise.id}>
						{String(exercise.slug ? tExercise(exercise.slug as Parameters<typeof tExercise>[0]) : exercise.name)}
					</NativeSelectOption>
				))}
			</NativeSelect>

			<Button>Add exercise</Button>
		</form>
	);
}
