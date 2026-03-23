"use client";

import type { ElProps } from "@Shared/types";
import type { ExerciseCategory } from "../model";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CheckIcon, EditIcon, TrashIcon } from "lucide-react";

import { Button, Card, CardTitle, Input } from "@Shared/ui";
import { cn } from "@Shared/utils";
import { QUERY_KEYS_EXERCISE } from "@Entities/exercise";
import { useUser } from "@Entities/user";

import { deleteExerciseCategory, QUERY_KEYS_EXERCISE_CATEGORY, updateExerciseCategory } from "../api";

export interface CardExerciseCategoryProps extends ElProps<"div"> {
	category: ExerciseCategory;
}

export function CardExerciseCategory({ className, category, ...restProps }: CardExerciseCategoryProps) {
	const refInputName = useRef<HTMLInputElement>(null);

	const [isEditing, setIsEditing] = useState(false);

	const tExerciseCategories = useTranslations("exerciseCategories");
	const user = useUser();
	const queryClient = useQueryClient();

	const categoryName = String(
		category.slug ? tExerciseCategories(category.slug as Parameters<typeof tExerciseCategories>[0]) : category.name,
	);

	const isEditable = user && !category.isSystem;
	const isRemovable = user && !category.isSystem;

	function handleClickEdit() {
		setIsEditing(true);
	}

	async function handleClickSave() {
		if (!user) {
			return;
		}

		if (refInputName.current?.value && refInputName.current.value !== categoryName) {
			await updateExerciseCategory({ categoryId: category.id, name: refInputName.current.value });

			queryClient.invalidateQueries({ queryKey: QUERY_KEYS_EXERCISE_CATEGORY.user(user.id) });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS_EXERCISE.user(user.id) });
		}

		setIsEditing(false);
	}

	async function handleClickRemove() {
		if (!user) {
			return;
		}

		await deleteExerciseCategory({ categoryId: category.id });

		queryClient.invalidateQueries({ queryKey: QUERY_KEYS_EXERCISE_CATEGORY.user(user.id) });
		queryClient.invalidateQueries({ queryKey: QUERY_KEYS_EXERCISE.user(user.id) });
	}

	useEffect(() => {
		if (isEditing) {
			refInputName.current?.focus();
		}
	}, [isEditing]);

	return (
		<Card className={cn("flex items-center gap-4 justify-between p-4 flex-row", className)} {...restProps}>
			<CardTitle className="grow font-bold">
				{isEditing ? (
					<Input ref={refInputName} placeholder="Enter category name" defaultValue={categoryName} />
				) : (
					categoryName
				)}
			</CardTitle>

			{(isEditable || isRemovable) && (
				<div className="flex items-center gap-2">
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
				</div>
			)}
		</Card>
	);
}
