"use client";

import type { ElProps } from "@Shared/types";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, EditIcon, TrashIcon } from "lucide-react";

import { Button, Card, CardContent, CardTitle, Input } from "@Shared/ui";
import { cn } from "@Shared/utils";

import { deleteExerciseCategory, updateExerciseCategory } from "../api";

export interface CardExerciseCategoryProps extends ElProps<"div"> {
	categoryId: string;
	categoryName: string;
	isEditable?: boolean;
	isRemovable?: boolean;
}

export function CardExerciseCategory({
	className,
	categoryId,
	categoryName,
	isEditable,
	isRemovable,
	...restProps
}: CardExerciseCategoryProps) {
	const refInputName = useRef<HTMLInputElement>(null);

	const [isEditing, setIsEditing] = useState(false);

	function handleClickEdit() {
		setIsEditing(true);
	}

	async function handleClickSave() {
		if (refInputName.current?.value && refInputName.current.value !== categoryName) {
			await updateExerciseCategory({ categoryId, name: refInputName.current.value });
		}

		setIsEditing(false);
	}

	async function handleClickRemove() {
		await deleteExerciseCategory({ categoryId });
	}

	useEffect(() => {
		if (isEditing) {
			refInputName.current?.focus();
		}
	}, [isEditing]);

	return (
		<Card className={cn("gap-0 py-4", className)} {...restProps}>
			<CardContent className="flex items-center gap-4 px-4 justify-between">
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
			</CardContent>
		</Card>
	);
}
