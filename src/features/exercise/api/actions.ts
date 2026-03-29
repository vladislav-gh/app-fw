"use server";

import { getZodFieldErrors } from "@Shared/utils";
import { createExercise } from "@Entities/exercise";

import { AddExerciseSchema } from "../model";

export async function addExerciseAction(_prevState: unknown, formData: FormData) {
	const schemaResult = AddExerciseSchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		categoryIds: formData.getAll("categoryIds") as string[],
	});

	if (!schemaResult.success) {
		return {
			success: false,
			fields: getZodFieldErrors(schemaResult.error),
		};
	}

	const result = await createExercise(schemaResult.data);

	return { success: true, data: result };
}
