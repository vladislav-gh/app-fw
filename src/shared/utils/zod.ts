import * as z from "zod";

export function getZodFieldErrors<T>(schemaResultError: z.ZodError<T>) {
	return Object.entries(z.flattenError(schemaResultError).fieldErrors).reduce(
		(acc, [key, value]) => {
			if (Array.isArray(value) && value.length) {
				acc[key] = value[0];
			}

			return acc;
		},
		{} as Record<string, string>,
	);
}
