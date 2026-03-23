"use client";

import type { ElProps } from "@Shared/types";

import { useTranslations } from "next-intl";
import { useActionState, useEffect, useEffectEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button, Input, NativeSelect, NativeSelectOption, Textarea } from "@Shared/ui";
import { cn } from "@Shared/utils";
import { QUERY_KEYS_EXERCISE } from "@Entities/exercise";
import { useExerciseCategoriesAll } from "@Entities/exercise-category";
import { useUser } from "@Entities/user";

import { addExerciseAction } from "../api";

export type FormExerciseAddProps = ElProps<"form">;

export function FormExerciseAdd({ className, ...restProps }: FormExerciseAddProps) {
	const tExerciseCategories = useTranslations("exerciseCategories");
	const [state, dispatchAction] = useActionState(addExerciseAction, null);
	const queryClient = useQueryClient();
	const user = useUser();
	const exerciseCategoriesAll = useExerciseCategoriesAll();

	const handleSuccess = useEffectEvent(() => {
		if (user && state?.success && state.data) {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS_EXERCISE.user(user.id) });
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
			<Textarea name="description" placeholder="Enter category description" />

			{!!exerciseCategoriesAll.length && (
				<NativeSelect className="h-28" wrapperClassName="w-full" name="categoryIds" multiple>
					<NativeSelectOption value="">Select categories</NativeSelectOption>

					{exerciseCategoriesAll.map(category => (
						<NativeSelectOption key={category.id} value={category.id}>
							{String(
								category.slug
									? tExerciseCategories(category.slug as Parameters<typeof tExerciseCategories>[0])
									: category.name,
							)}
						</NativeSelectOption>
					))}
				</NativeSelect>
			)}

			<Button type="submit">Add exercise</Button>
		</form>
	);
}
