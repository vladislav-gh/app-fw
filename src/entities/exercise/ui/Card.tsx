"use client";

import type { ElProps } from "@Shared/types";
import type { Exercise, ExerciseUpdateDTO } from "../model";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { CheckIcon, EditIcon, TrashIcon } from "lucide-react";

import {
	Badge,
	Button,
	Card,
	CardDescription,
	CardFooter,
	CardTitle,
	Input,
	NativeSelect,
	NativeSelectOption,
	Textarea,
} from "@Shared/ui";
import { cn } from "@Shared/utils";
import { useExerciseCategoriesAll } from "@Entities/exercise-category";

import { deleteExercise, updateExercise } from "../api";

export interface CardExerciseProps extends ElProps<"div"> {
	exercise: Exercise;
}

export function CardExercise({ className, exercise, ...restProps }: CardExerciseProps) {
	const refInputName = useRef<HTMLInputElement>(null);
	const refTextareaDescription = useRef<HTMLTextAreaElement>(null);
	const refSelectCategories = useRef<HTMLSelectElement>(null);

	const [isEditing, setIsEditing] = useState(false);

	const tExercise = useTranslations("exercises");
	const tExerciseCategories = useTranslations("exerciseCategories");
	const exerciseCategoriesAll = useExerciseCategoriesAll();

	const exerciseName = String(
		exercise.slug ? tExercise(exercise.slug as Parameters<typeof tExercise>[0]) : exercise.name,
	);

	const isEditable = !exercise.isSystem;
	const isRemovable = !exercise.isSystem;

	function handleClickEdit() {
		setIsEditing(true);
	}

	async function handleClickSave() {
		const data: Omit<ExerciseUpdateDTO, "exerciseId"> = {};

		if (refInputName.current?.value && refInputName.current.value !== exercise.name) {
			data.name = refInputName.current.value;
		}

		if (refTextareaDescription.current && refTextareaDescription.current.value !== exercise.description) {
			data.description = refTextareaDescription.current.value;
		}

		if (refSelectCategories.current) {
			const selectedOptions = Array.from(refSelectCategories.current.selectedOptions).filter(option =>
				Boolean(option.value),
			);

			let needUpdate = false;

			if (selectedOptions.length !== exercise.categories.length) {
				needUpdate = true;
			} else {
				for (const option of selectedOptions) {
					if (!exercise.categories.some(category => category.id === option.value)) {
						needUpdate = true;

						break;
					}
				}
			}

			if (needUpdate) {
				data.categoryIds = selectedOptions.map(option => option.value);
			}
		}

		if (Object.keys(data).length) {
			await updateExercise({ exerciseId: exercise.id, ...data });
		}

		setIsEditing(false);
	}

	async function handleClickRemove() {
		await deleteExercise({ exerciseId: exercise.id });
	}

	useEffect(() => {
		if (isEditing) {
			refInputName.current?.focus();
		}
	}, [isEditing]);

	return (
		<Card className={cn("p-4 gap-2", className)} {...restProps}>
			<CardTitle className="grow font-bold">
				{isEditing ? (
					<Input ref={refInputName} placeholder="Enter exercise name" defaultValue={exerciseName} />
				) : (
					exerciseName
				)}
			</CardTitle>

			{!isEditing && exercise.description && <CardDescription>{exercise.description}</CardDescription>}

			{isEditing && (
				<Textarea
					ref={refTextareaDescription}
					placeholder="Enter exercise description"
					defaultValue={exercise.description ?? undefined}
				/>
			)}

			{!isEditing && !!exercise.categories.length && (
				<div className="flex items-center flex-wrap gap-1">
					{exercise.categories.map(category => (
						<Badge key={category.id} variant="secondary">
							{String(
								category.slug
									? tExerciseCategories(category.slug as Parameters<typeof tExerciseCategories>[0])
									: category.name,
							)}
						</Badge>
					))}
				</div>
			)}

			{isEditing && !!exerciseCategoriesAll.length && (
				<NativeSelect
					ref={refSelectCategories}
					className="h-24"
					wrapperClassName="w-full"
					multiple
					defaultValue={exerciseCategoriesAll
						.filter(category => !!exercise.categories.find(c => c.id === category.id))
						.map(category => category.id)}
				>
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

			{(isEditable || isRemovable) && (
				<CardFooter className="flex items-center gap-2 px-0">
					{isEditable && !isEditing && (
						<Button variant="outline" size="icon" aria-label="Edit" onClick={handleClickEdit}>
							<EditIcon />
						</Button>
					)}

					{isEditable && isEditing && (
						<Button variant="outline" size="icon" aria-label="Save" onClick={handleClickSave}>
							<CheckIcon />
						</Button>
					)}

					{isRemovable && (
						<Button variant="outline" size="icon" aria-label="Remove" onClick={handleClickRemove}>
							<TrashIcon />
						</Button>
					)}
				</CardFooter>
			)}
		</Card>
	);
}
