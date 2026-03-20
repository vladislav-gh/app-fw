const QUERY_KEY = "exerciseCategory";

export const QUERY_KEYS_EXERCISE_CATEGORY = {
	system: [QUERY_KEY, "system"],
	user: (userId: string) => [QUERY_KEY, "user", userId],
} as const;
