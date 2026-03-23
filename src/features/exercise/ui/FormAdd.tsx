"use client";

import type { ElProps } from "@Shared/types";

import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";

import { Button, Input, NativeSelect, NativeSelectOption, Textarea } from "@Shared/ui";
import { cn } from "@Shared/utils";
import { useExerciseCategoriesAll } from "@Entities/exercise-category";

import { addExerciseAction } from "../api";

export type FormExerciseAddProps = ElProps<"form">;

export function FormExerciseAdd({ className, ...restProps }: FormExerciseAddProps) {
	const tExerciseCategories = useTranslations("exerciseCategories");
	const [state, dispatchAction] = useActionState(addExerciseAction, null);
	const exerciseCategoriesAll = useExerciseCategoriesAll();

	useEffect(() => {
		console.log("add exercise state:", state);
	}, [state]);

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
