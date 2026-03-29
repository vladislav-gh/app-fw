import * as z from "zod";

export const AddExerciseSchema = z.object({
	name: z.string().min(1).trim(),
	description: z.string().trim().optional(),
	categoryIds: z.array(z.string().trim()).optional(),
});
