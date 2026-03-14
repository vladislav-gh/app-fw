"use client";

import type { ElProps } from "@Shared/types";
import type { ExerciseUpdateDTO } from "../model";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, EditIcon, TrashIcon } from "lucide-react";

import { Button, Card, CardDescription, CardFooter, CardTitle, Input, Textarea } from "@Shared/ui";
import { cn } from "@Shared/utils";

import { deleteExercise, updateExercise } from "../api";

export interface CardExerciseProps extends ElProps<"div"> {
	exerciseId: string;
	exerciseName: string;
	exerciseDescription?: string;
	isEditable?: boolean;
	isRemovable?: boolean;
}

export function CardExercise({
	className,
	exerciseId,
	exerciseName,
	exerciseDescription,
	isEditable,
	isRemovable,
	...restProps
}: CardExerciseProps) {
	const refInputName = useRef<HTMLInputElement>(null);
	const refTextareaDescription = useRef<HTMLTextAreaElement>(null);

	const [isEditing, setIsEditing] = useState(false);

	function handleClickEdit() {
		setIsEditing(true);
	}

	async function handleClickSave() {
		const data: Pick<ExerciseUpdateDTO, "name" | "description"> = {};

		if (refInputName.current?.value && refInputName.current.value !== exerciseName) {
			data.name = refInputName.current.value;
		}

		if (refTextareaDescription.current?.value && refTextareaDescription.current.value !== exerciseDescription) {
			data.description = refTextareaDescription.current.value;
		}

		if (Object.keys(data).length) {
			await updateExercise({ exerciseId, ...data });
		}

		setIsEditing(false);
	}

	async function handleClickRemove() {
		await deleteExercise({ exerciseId });
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

			{exerciseDescription && (
				<CardDescription>
					{isEditing ? (
						<Textarea
							ref={refTextareaDescription}
							placeholder="Enter exercise description"
							defaultValue={exerciseDescription}
						/>
					) : (
						exerciseDescription
					)}
				</CardDescription>
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
