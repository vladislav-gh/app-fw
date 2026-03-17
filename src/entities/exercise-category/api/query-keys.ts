const QUERY_KEY = "exerciseCategory";

export const QUERY_KEYS_EXERCISE_CATEGORY = {
	user: (userId: string) => [QUERY_KEY, "user", userId],
} as const;
